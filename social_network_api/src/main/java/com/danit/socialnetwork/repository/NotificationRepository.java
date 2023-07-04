package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
  @Query(nativeQuery = true, value = "select * from (select * "
      + "from notifications where follower_user_id = :userId "
      + "order by created_at desc limit 25) "
      + "as latest_notifications order by created_at")
  List<Notification> findAllByFollowerUserId(Integer userId);

  List<Notification> findAllByFollowingUserId(Integer userId);

  List<Notification> findAllByFollowerUserIdAndNotificationRead(Integer followerUserId, Boolean notificationRead);

  Notification findNotificationByNotificationId(Integer notificationId);
}
