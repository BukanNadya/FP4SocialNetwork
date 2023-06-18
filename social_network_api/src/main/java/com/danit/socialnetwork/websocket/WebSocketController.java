package com.danit.socialnetwork.websocket;

import com.danit.socialnetwork.dto.NotificationType;
import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.service.NotificationService;
import com.danit.socialnetwork.service.PostService;
import com.danit.socialnetwork.service.UserFollowService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@Controller
@RequiredArgsConstructor
public class WebSocketController {
  private final NotificationService notificationService;
  private final UserFollowService userFollowService;
  private final UserService userService;
  private final PostService postService;
  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @MessageMapping("/post")
  public NotificationRequest postNotification(
      @Payload NotificationRequest notificationRequest) throws InterruptedException {

    Thread.sleep(500);

    UserDtoResponse user = userService.findByUserId(notificationRequest.getUserId());

    LocalDateTime dateTime = LocalDateTime.now();
    notificationRequest.setDateTime(dateTime);

    Integer userId = user.getUserId();
    Integer postId = postService.findLatestPostIdByUserId(userId);
    notificationRequest.setEventId(postId);
    log.info("POST ID: " + postId);

    String notificationType = NotificationType.POST.get();
    notificationRequest.setEventType(notificationType);

    String userName = user.getUsername();
    notificationRequest.setUserName(userName);

    String userPhoto = user.getProfileImageLink();
    notificationRequest.setUserPhoto(userPhoto);

    String notificationText = userName + " published a new post";
    notificationRequest.setNotificationText(notificationText);

    notificationRequest.setNotificationRead(false);

    List<UserFollowDtoResponse> followers = userFollowService
        .getAllUsersByUserFollowerId(userId);

    for (UserFollowDtoResponse follower : followers) {
      Integer followerId = follower.getUserId();

      Notification newNotification = new Notification(
          followerId, notificationType, notificationRequest.getEventId(), notificationRequest.getUserId(),
          userName, userPhoto, notificationText);
      notificationService.saveNotification(newNotification);

      String followerIdString = followerId.toString();
      messagingTemplate.convertAndSendToUser(followerIdString, "/notifications", notificationRequest);
    }
    return notificationRequest;
  }
}