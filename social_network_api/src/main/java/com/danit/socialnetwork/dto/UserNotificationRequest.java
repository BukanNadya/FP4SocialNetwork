package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class UserNotificationRequest {
  Integer userFollower;
  Integer userFollowing;
  Boolean receiveNotifications;

}