package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class NotificationServiceImpl implements NotificationService {

  private final NotificationRepository notificationRepository;

  @Override
  public Optional<Notification> findAllByUserId(Integer userId) {
    return notificationRepository.findAllByUserId(userId);
  }

  @Override
  public void saveNotification(Notification notification) {
    notificationRepository.save(notification);
  }
}
