package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class NotificationRequest {
  Integer userId;
  String notificationText;
}
