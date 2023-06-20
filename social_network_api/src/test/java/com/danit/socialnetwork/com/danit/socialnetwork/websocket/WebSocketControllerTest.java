package com.danit.socialnetwork.websocket;

import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.service.NotificationService;
import com.danit.socialnetwork.service.PostService;
import com.danit.socialnetwork.service.UserFollowService;
import com.danit.socialnetwork.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;

class WebSocketControllerTest {

  @Mock
  private NotificationService notificationService;
  @Mock
  private UserFollowService userFollowService;
  @Mock
  private UserService userService;
  @Mock
  private PostService postService;
  @Mock
  private SimpMessagingTemplate messagingTemplate;

  private WebSocketController webSocketController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    webSocketController = new WebSocketController(
        notificationService,
        userFollowService,
        userService,
        postService
    );
    webSocketController.setMessagingTemplate(messagingTemplate);
  }

  @Test
  void testPostNotificationForRepost() throws InterruptedException {
    // Create test data
    RepostDtoSave repostDtoSave = new RepostDtoSave();
    repostDtoSave.setUserId(1);
    repostDtoSave.setPostId(1);

    Post postByPostId = new Post();
    postByPostId.setUserPost(new DbUser());
    postByPostId.getUserPost().setUserId(2);

    when(postService.findPostByPostId(repostDtoSave.getPostId())).thenReturn(postByPostId);

    DbUser repostUser = new DbUser();
    repostUser.setUsername("TestUser");
    repostUser.setProfileImageUrl("testimage.jpg");

    when(userService.findDbUserByUserId(repostDtoSave.getUserId())).thenReturn(repostUser);

    NotificationRequest notificationRequest = new NotificationRequest();
    LocalDateTime dateTime = LocalDateTime.now();
    notificationRequest.setDateTime(dateTime);

    int authUserId = postByPostId.getUserPost().getUserId();
    notificationRequest.setUserId(authUserId);

    String notificationType = "post";
    notificationRequest.setEventType(notificationType);
    notificationRequest.setEventId(repostDtoSave.getPostId());

    String repostUserUsername = repostUser.getUsername();
    notificationRequest.setUserName(repostUserUsername);

    String repostUserPhoto = repostUser.getProfileImageUrl();
    notificationRequest.setUserPhoto(repostUserPhoto);

    String notificationText = repostUserUsername + " reposted your post";
    notificationRequest.setNotificationText(notificationText);

    notificationRequest.setNotificationRead(false);

    Notification newNotification = new Notification(
        authUserId, notificationType, repostDtoSave.getPostId(), repostDtoSave.getUserId(),
        repostUserUsername, repostUserPhoto, notificationText);

    when(notificationService.saveNotification(newNotification)).thenReturn(newNotification);

    String authUserIdString = String.valueOf(authUserId);
    messagingTemplate.convertAndSendToUser(authUserIdString, "/notifications", notificationRequest);

    int unreadNotificationsNum = 0;
    when(notificationService.findAllByFollowerUserIdAndNotificationRead(authUserId, false))
        .thenReturn(new ArrayList<>());
    Map<String, Integer> unreadNotifications = new HashMap<>();
    unreadNotifications.put("unreadNotifications", unreadNotificationsNum);
    messagingTemplate.convertAndSendToUser(authUserIdString, "/unread_notifications", unreadNotifications);

    // Call the method under test
    webSocketController.postNotification(repostDtoSave);

    // Verify method calls and sent messages
    verify(postService, times(1)).findPostByPostId(repostDtoSave.getPostId());
    verify(userService, times(1)).findDbUserByUserId(repostDtoSave.getUserId());
    verify(notificationService, times(1)).saveNotification(newNotification);
    verify(messagingTemplate, times(1)).convertAndSendToUser(authUserIdString, "/notifications", notificationRequest);
  }

  @Test
  void testPostNotificationForPost() throws InterruptedException {
    // Create test data
    NotificationRequest notificationRequest = new NotificationRequest();
    notificationRequest.setUserId(1);

    UserDtoResponse user = new UserDtoResponse();
    user.setUserId(1);
    user.setUsername("TestUser");
    user.setProfileImageLink("testimage.jpg");
    when(userService.findByUserId(notificationRequest.getUserId())).thenReturn(user);

    LocalDateTime now = LocalDateTime.now();
    when(postService.findLatestPostIdByUserId(user.getUserId())).thenReturn(1);
    when(notificationService.findAllByFollowerUserIdAndNotificationRead(anyInt(), anyBoolean())).thenReturn(new ArrayList<>());

    List<UserFollowDtoResponse> followers = new ArrayList<>();
    UserFollowDtoResponse follower = new UserFollowDtoResponse();
    follower.setUserId(2);
    followers.add(follower);
    when(userFollowService.getAllUsersByUserFollowerId(user.getUserId())).thenReturn(followers);

    // Call the method under test
    webSocketController.postNotification(notificationRequest);

    // Verify method calls and sent messages
    verify(userService, times(1)).findByUserId(notificationRequest.getUserId());
    verify(postService, times(1)).findLatestPostIdByUserId(user.getUserId());
    verify(notificationService, times(followers.size())).saveNotification(any(Notification.class));
    verify(messagingTemplate, times(followers.size())).convertAndSendToUser(anyString(), eq("/notifications"), eq(notificationRequest));
    verify(messagingTemplate, times(followers.size())).convertAndSendToUser(anyString(), eq("/unread_notifications"), anyMap());
  }
}


