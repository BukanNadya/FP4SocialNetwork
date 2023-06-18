package com.danit.socialnetwork.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationRequest {
  LocalDateTime dateTime;
  Integer userId;
  String eventType;
  Integer eventId;
  String userName;
  String userPhoto;
  String notificationText;
  Boolean notificationRead;

  public NotificationRequest(LocalDateTime dateTime, Integer userId, String eventType,
                             Integer eventId, String userName, String userPhoto,
                             String notificationText, Boolean notificationRead) {
    this.dateTime = dateTime;
    this.userId = userId;
    this.eventType = eventType;
    this.eventId = eventId;
    this.userName = userName;
    this.userPhoto = userPhoto;
    this.notificationText = notificationText;
    this.notificationRead = notificationRead;
  }
}
