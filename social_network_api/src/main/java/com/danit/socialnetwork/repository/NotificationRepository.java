package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
  Optional<Notification> findAllByUserId(Integer userId);
}
