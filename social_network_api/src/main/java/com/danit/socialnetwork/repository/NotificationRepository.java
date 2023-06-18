package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

  List<Notification> findAllByFollowerUserId(Integer userId);

  List<Notification> findAllByFollowingUserId(Integer userId);

  List<Notification> findAllByFollowerUserIdAndNotificationRead(Integer followerUserId, Boolean notificationRead);

  Notification findNotificationByNotificationId(Integer notificationId);
}
