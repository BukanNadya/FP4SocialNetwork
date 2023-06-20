package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class NotificationServiceImpl implements NotificationService {

  private final NotificationRepository notificationRepository;

  @Override
  public List<Notification> findAllByFollowerUserId(Integer userId) {
    return notificationRepository.findAllByFollowerUserId(userId);
  }

  @Override
  public List<Notification> findAllByFollowingUserId(Integer userId) {
    return notificationRepository.findAllByFollowingUserId(userId);
  }

  @Override
  public Notification saveNotification(Notification notification) {
    return notificationRepository.save(notification);
  }

  @Override
  public List<Notification> findAllByFollowerUserIdAndNotificationRead(
      Integer followerUserId, Boolean notificationRead) {
    return notificationRepository.findAllByFollowerUserIdAndNotificationRead(
        followerUserId, notificationRead);
  }

  @Override
  public Notification findNotificationByNotificationId(Integer notificationId) {
    return notificationRepository.findNotificationByNotificationId(notificationId);
  }

}
