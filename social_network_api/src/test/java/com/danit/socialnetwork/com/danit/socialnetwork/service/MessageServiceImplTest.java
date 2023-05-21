package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.MessageRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MessageServiceImplTest {
  @InjectMocks
  MessageServiceImpl messageService;
  @Mock
  MessageRepository messageRepository;

  @Test
  void saveMessage() {
    Message testMessage = new Message();
    testMessage.setInboxUid(28);
    testMessage.setUserId(34);
    testMessage.setMessage("Hallo world!");

    when(messageRepository.save(testMessage)).thenReturn(testMessage);

    Message savedMessage = messageService.saveMessage(testMessage);
    Mockito.verify(messageRepository).save(testMessage);

    Assert.assertEquals(testMessage, savedMessage);
  }

  @Test
  void findByInboxUidAndUserIdOrUserIdAndInboxUid_shouldFindAllMessagesByTwoUsers () {
    Message message1 = new Message();
    message1.setInboxUid(28);
    message1.setUserId(34);
    message1.setMessage("Hello");
    Message message2 = new Message();
    message2.setMessage("World");
    message2.setInboxUid(34);
    message2.setUserId(28);

    List<Message> testMessages = new ArrayList<>();
    testMessages.add(message1);
    testMessages.add(message2);

    when(messageRepository
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(28, 34, 28, 34))
        .thenReturn(testMessages);

    List<Message> testFindMessages = messageService
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(28, 34, 28, 34);

    Assert.assertEquals(testMessages, testFindMessages);
  }

}