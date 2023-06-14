package com.danit.socialnetwork.websocket;

import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.service.NotificationService;
import com.danit.socialnetwork.service.UserFollowService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
  private final NotificationService notificationService;
  private final UserFollowService userFollowService;
  private final UserService userService;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;


  @MessageMapping("/post") // app/post
  public void receivePrivateMessage(
      @Payload NotificationRequest notificationRequest) {
    String username = userService.findByUserId(notificationRequest.getUserId()).getUsername();
    List<UserFollowDtoResponse> followers = userFollowService
        .getAllUsersByUserFollowerId(notificationRequest.getUserId());

    for (UserFollowDtoResponse follower : followers) {
      Integer followerId = follower.getUserId();
      String notificationText = username + " published a new post";
      Notification newNotification = new Notification(
          followerId, notificationRequest.getUserId(),
          notificationText);
      notificationService.saveNotification(newNotification);

      notificationRequest.setNotificationText(notificationText);
      simpMessagingTemplate.convertAndSendToUser(followerId.toString(),
          "/api/notifications", notificationRequest);
    }
  }
}