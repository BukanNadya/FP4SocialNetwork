package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.repository.NotificationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.swing.text.html.Option;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NotificationServiceImplTest {

  @InjectMocks
  NotificationServiceImpl notificationService;

  @Mock
  NotificationRepository notificationRepository;

  @Test
  void findAllByUserId() {

    Notification notification = new Notification(1,2, "test");

    when(notificationRepository.findAllByUserId(1)).thenReturn(Optional.of(notification));
    Optional<Notification> maybeNotification = notificationService.findAllByUserId(1);
    String notificationText = maybeNotification.get().getNotificationText();
    Assertions.assertEquals("test",notificationText);


  }
}