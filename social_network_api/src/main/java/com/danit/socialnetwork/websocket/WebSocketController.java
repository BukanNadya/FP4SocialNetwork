package com.danit.socialnetwork.websocket;

import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.service.NotificationService;
import com.danit.socialnetwork.service.UserFollowService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@Controller
@RequiredArgsConstructor
public class WebSocketController {
  private final NotificationService notificationService;
  private final UserFollowService userFollowService;
  private final UserService userService;
  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @MessageMapping("/post")
  public NotificationRequest postNotification(
      @Payload NotificationRequest notificationRequest) {

    UserDtoResponse user = userService.findByUserId(notificationRequest.getUserId());
    Integer userId = user.getUserId();
    String userName = user.getUsername();
    String userPhoto = user.getProfileImageLink();
    LocalDateTime dateTime = LocalDateTime.now();
    String notificationText = userName + " published a new post";

    List<UserFollowDtoResponse> followers = userFollowService
        .getAllUsersByUserFollowerId(userId);

    for (UserFollowDtoResponse follower : followers) {
      Integer followerId = follower.getUserId();
      Notification newNotification = new Notification(
          followerId, notificationRequest.getUserId(),
          userPhoto, notificationText);
      notificationService.saveNotification(newNotification);

      notificationRequest.setNotificationText(notificationText);
      notificationRequest.setUserName(userName);
      notificationRequest.setUserPhoto(userPhoto);
      notificationRequest.setDateTime(dateTime);
      String followerIdString = followerId.toString();
      messagingTemplate.convertAndSendToUser(followerIdString, "/notifications", notificationRequest);
    }
    return notificationRequest;
  }
}