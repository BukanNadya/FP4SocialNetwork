package com.danit.socialnetwork.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class NotificationRequest {
  Integer userId;
  String userName;
  String notificationText;
  String userPhoto;
  LocalDateTime dateTime;
}
