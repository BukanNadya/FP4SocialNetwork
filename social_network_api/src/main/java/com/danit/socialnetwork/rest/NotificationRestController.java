package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NotificationRestController {
  private final NotificationService notificationService;


  @PostMapping(path = "/notifications")
  public ResponseEntity<Object> getAllNotificationsByUserId(@RequestBody NotificationRequest notificationReq) {
    Integer followerUserId = notificationReq.getUserId();
    List<Notification> allNotificationsByUserId = notificationService.findAllByFollowerUserId(followerUserId);
    log.info("NOTIFICATIONS!!! " + allNotificationsByUserId.size());

    List<NotificationRequest> notificationRequestList = new ArrayList<>();

    for (Notification notification : allNotificationsByUserId) {
      NotificationRequest notificationRequest = new NotificationRequest(
          notification.getDateTime().toLocalDateTime(),
          notification.getFollowerUserId(),
          notification.getEventType(),
          notification.getEventId(),
          notification.getFollowingUserName(),
          notification.getFollowingUserPhoto(),
          notification.getNotificationText(),
          true
      );
      notificationRequestList.add(notificationRequest);
      Notification currentNotification = notificationService
          .findNotificationByNotificationId(notification.getNotificationId());
      currentNotification.setNotificationRead(true);
      notificationService.saveNotification(currentNotification);
    }
    return new ResponseEntity<>(notificationRequestList, HttpStatus.OK);
  }

  @PostMapping(path = "/read_notifications")
  public void unreadToReadNotifications(@RequestBody NotificationRequest notificationReq) {
    Integer followerUserId = notificationReq.getUserId();

    List<Notification> allNotificationsByUserId = notificationService
        .findAllByFollowerUserIdAndNotificationRead(followerUserId, false);

    for (Notification notification : allNotificationsByUserId) {
      Notification currentNotification = notificationService
          .findNotificationByNotificationId(notification.getNotificationId());
      currentNotification.setNotificationRead(true);
      notificationService.saveNotification(currentNotification);
    }
  }

  @PostMapping(path = "/unread_notifications")
  public ResponseEntity<Object> findAllByFollowerUserIdAndNotificationRead(
      @RequestBody NotificationRequest notificationReq) {
    Integer follower = notificationReq.getUserId();
    List<Notification> unreadNotifications = notificationService
        .findAllByFollowerUserIdAndNotificationRead(follower, false);
    Map<String, String> num = new HashMap<>();
    num.put("unreadNotifications", String.valueOf(unreadNotifications.size()));
    return new ResponseEntity<>(num, HttpStatus.OK);
  }
}
