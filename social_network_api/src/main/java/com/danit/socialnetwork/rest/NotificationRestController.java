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
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NotificationRestController {
  private final NotificationService notificationService;


  @PostMapping(path = "/notifications")
  public ResponseEntity<Object> getAllNotificationsByUserId(@RequestBody NotificationRequest notificationReq) {
    Integer followerUserId = notificationReq.getUserId();
    List<Notification> allByUserId = notificationService.findAllByFollowerUserId(followerUserId);

    List<NotificationRequest> notificationRequestList = new ArrayList<>();

    for (Notification notification : allByUserId) {
      NotificationRequest notificationRequest = new NotificationRequest(
          notification.getDateTime().toLocalDateTime(),
          notification.getFollowerUserId(),
          notification.getEventType(),
          notification.getEventId(),
          notification.getFollowingUserName(),
          notification.getFollowingUserPhoto(),
          notification.getNotificationText(),
          notification.getNotificationRead()
      );
      notificationRequestList.add(notificationRequest);
    }
    return new ResponseEntity<>(notificationRequestList, HttpStatus.OK);
  }
}
