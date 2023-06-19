package com.danit.socialnetwork.websocket;
import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.Notification;
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
  void testPostNotification() throws InterruptedException {
    // Создание тестовых данных
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

    // Вызов метода для тестирования
    webSocketController.postNotification(notificationRequest);

    // Проверка вызовов методов и отправленных сообщений
    verify(userService, times(1)).findByUserId(notificationRequest.getUserId());
    verify(postService, times(1)).findLatestPostIdByUserId(user.getUserId());
    verify(notificationService, times(1)).saveNotification(any(Notification.class));
    verify(messagingTemplate, times(1)).convertAndSendToUser("2", "/notifications", notificationRequest);
    verify(messagingTemplate, times(1)).convertAndSendToUser("2", "/unread_notifications", new HashMap<String, Integer>() {{
      put("unreadNotifications", 0);
    }});
  }
}
