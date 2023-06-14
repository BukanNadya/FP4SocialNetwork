package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;

import java.util.Optional;

public interface NotificationService {

  Optional<Notification> findAllByUserId(Integer userId);

  void saveNotification(Notification notification);
}
