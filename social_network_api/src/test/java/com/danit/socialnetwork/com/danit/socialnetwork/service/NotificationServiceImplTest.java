package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.repository.NotificationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NotificationServiceImplTest {

  @InjectMocks
  NotificationServiceImpl notificationService;

  @Mock
  NotificationRepository notificationRepository;

  @Test
  void findAllByUserId() {

    Notification notification = new Notification(1,"post",
        2,3,"Alex",
        "photoLink", "test");
    List<Notification> notificationList = new ArrayList<>();
    notificationList.add(notification);

    when(notificationRepository.findAllByFollowerUserId(1)).thenReturn(notificationList);
    Notification maybeNotification = notificationService.findAllByFollowerUserId(1).get(0);
    String notificationText = maybeNotification.getNotificationText();
    Assertions.assertEquals("test",notificationText);


  }
}