package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;

import java.util.List;

public interface NotificationService {


  List<Notification> findAllByFollowerUserId(Integer followerUserId);

  List<Notification> findAllByFollowingUserId(Integer userId);

  void saveNotification(Notification notification);
}
