package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.mappers.InboxMapperImpl;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.InboxRepository;
import com.danit.socialnetwork.repository.MessageRepository;
import com.danit.socialnetwork.repository.UserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InboxServiceImplTest {
  @InjectMocks
  InboxServiceImpl inboxServiceImpl;
  @Mock
  InboxRepository inboxRepository;
  @Mock
  MessageRepository messageRepository;
  @Mock
  UserServiceImpl userService;
  @Mock
  InboxMapperImpl mapper;
  @Mock
  SimpMessagingTemplate messagingTemplate;

  @Test
  void findByInboxUidAndLastSentUserId_shouldFindInbox_WhenExists() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Inbox testInbox = new Inbox();
    testInbox.setInboxUid(testUser1);
    testInbox.setUserId(testUser2);

    when(inboxRepository.findByInboxUidAndUserId(testUser1, testUser2))
        .thenReturn(Optional.of(testInbox));

    Optional<Inbox> testFindInbox = inboxServiceImpl.findByInboxUidAndLastSentUserId(testUser1, testUser2);
    verify(inboxRepository).findByInboxUidAndUserId(testUser1, testUser2);

    Assert.assertEquals(Optional.of(testInbox), testFindInbox);
  }

  @Test
  void findByInboxUidAndLastSentUserId_shouldNotFindInbox_WhenNotExists() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Optional<Inbox> testFindInbox = inboxServiceImpl.findByInboxUidAndLastSentUserId(testUser1, testUser2);

    verify(inboxRepository).findByInboxUidAndUserId(testUser1, testUser2);

    Assert.assertEquals(Optional.empty(), testFindInbox);
  }

  @Test
  void saveInbox_shouldSaveInbox_WhenNotExists() {

    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Message testMessage = new Message();
    testMessage.setMessageText("Hello World!");
    Inbox testInboxSender = new Inbox();
    testInboxSender.setInboxUid(testUser1);
    testInboxSender.setLastMessage(testMessage);
    testInboxSender.setUserId(testUser2);
    Inbox testInboxReceiver = new Inbox();
    testInboxSender.setInboxUid(testUser2);
    testInboxSender.setLastMessage(testMessage);
    testInboxSender.setUserId(testUser1);
    List<Inbox> testInboxes = new ArrayList<>();
    testInboxes.add(testInboxSender);
    testInboxes.add(testInboxReceiver);

    InboxDtoResponse responseTest = new InboxDtoResponse();
    responseTest.setInboxUid(1);
    responseTest.setUserId(2);
    responseTest.setMessage("Hello World!");

    when(inboxRepository.findByInboxUidAndUserId(testUser1, testUser2))
        .thenReturn(Optional.empty());
    when(inboxRepository.save(any(Inbox.class))).thenAnswer(invocation -> invocation.getArgument(0));

    List<Inbox> testSaveInboxes = inboxServiceImpl.saveInbox(testUser1, testUser2, testMessage);

    Assert.assertEquals(2, testSaveInboxes.size());
    Assert.assertEquals("Hello World!", testSaveInboxes.get(0).getLastMessage().getMessageText());
    Assert.assertEquals("Hello World!", testSaveInboxes.get(1).getLastMessage().getMessageText());
    Assert.assertEquals(Optional.of(1), Optional.of(testSaveInboxes.get(0).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2),  Optional.of(testSaveInboxes.get(1).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2), Optional.of(testSaveInboxes.get(0).getUserId().getUserId()));
    Assert.assertEquals(Optional.of(1),  Optional.of(testSaveInboxes.get(1).getUserId().getUserId()));
  }

  @Test
  void saveInbox__shouldUpdateInbox_WhenExists() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Message testMessage = new Message();
    testMessage.setMessageText("Hello World!");
    testMessage.setInboxUid(testUser1);
    testMessage.setUserId(testUser2);
    Inbox testInboxSender = new Inbox();
    testInboxSender.setInboxUid(testUser1);
    testInboxSender.setLastMessage(testMessage);
    testInboxSender.setUserId(testUser2);
    Inbox testInboxReceiver = new Inbox();
    testInboxReceiver.setInboxUid(testUser2);
    testInboxReceiver.setLastMessage(testMessage);
    testInboxReceiver.setUserId(testUser1);
    List<Inbox> testInboxes = new ArrayList<>();
    testInboxes.add(testInboxSender);
    testInboxes.add(testInboxReceiver);

    InboxDtoResponse responseTest = new InboxDtoResponse();
    responseTest.setInboxUid(1);
    responseTest.setUserId(2);
    responseTest.setMessage("Hello World!");

    when(inboxRepository.findByInboxUidAndUserId(testUser1, testUser2))
        .thenReturn(Optional.of(testInboxSender));
    when(inboxRepository.findByInboxUidAndUserId(testUser2, testUser1))
        .thenReturn(Optional.of(testInboxReceiver));
    when(inboxRepository.save(testInboxSender)).thenReturn(testInboxSender);
    when(inboxRepository.save(testInboxReceiver)).thenReturn(testInboxReceiver);

    List<Inbox> testSaveInboxes = inboxServiceImpl.saveInbox(testUser1, testUser2, testMessage);

    Assert.assertEquals(2, testSaveInboxes.size());
    Assert.assertEquals("Hello World!", testSaveInboxes.get(0).getLastMessage().getMessageText());
    Assert.assertEquals("Hello World!", testSaveInboxes.get(1).getLastMessage().getMessageText());
    Assert.assertEquals(Optional.of(1), Optional.of(testSaveInboxes.get(0).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2), Optional.of(testSaveInboxes.get(1).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2), Optional.of(testSaveInboxes.get(0).getUserId().getUserId()));
    Assert.assertEquals(Optional.of(1), Optional.of(testSaveInboxes.get(1).getUserId().getUserId()));
  }

  @Test
  void getInboxesByInboxUid_shouldGetAllInboxesByInboxUid() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    DbUser testUser3 = new DbUser();
    testUser3.setUserId(3);
    DbUser testUser4 = new DbUser();
    testUser4.setUserId(4);
    DbUser testUser5 = new DbUser();
    testUser5.setUserId(5);
    Message testMessage = new Message();
    testMessage.setMessageText("Hello World!");
    Inbox testInbox1 = new Inbox();
    testInbox1.setInboxUid(testUser1);
    testInbox1.setLastMessage(testMessage);
    testInbox1.setUserId(testUser2);
    Inbox testInbox2 = new Inbox();
    testInbox2.setInboxUid(testUser1);
    testInbox2.setLastMessage(testMessage);
    testInbox2.setUserId(testUser3);
    Inbox testInbox3 = new Inbox();
    testInbox3.setInboxUid(testUser1);
    testInbox3.setLastMessage(testMessage);
    testInbox3.setUserId(testUser4);
    Inbox testInbox4 = new Inbox();
    testInbox4.setInboxUid(testUser1);
    testInbox4.setLastMessage(testMessage);
    testInbox4.setUserId(testUser5);
    List<Inbox> testInbox = new ArrayList<>();
    testInbox.add(testInbox1);
    testInbox.add(testInbox2);
    testInbox.add(testInbox3);
    testInbox.add(testInbox4);
    InboxDtoResponse testInboxDtoResponse1 = new InboxDtoResponse();
    testInboxDtoResponse1.setUserId(2);
    InboxDtoResponse testInboxDtoResponse2 = new InboxDtoResponse();
    testInboxDtoResponse2.setUserId(3);
    InboxDtoResponse testInboxDtoResponse3 = new InboxDtoResponse();
    testInboxDtoResponse3.setUserId(4);
    InboxDtoResponse testInboxDtoResponse4 = new InboxDtoResponse();
    testInboxDtoResponse4.setUserId(5);

    Integer inboxUidTest = 1;
    when(inboxRepository.getInboxesByInboxUid(testUser1)).thenReturn(testInbox);
    when(userService.findDbUserByUserId(1)).thenReturn(testUser1);
    when(mapper.inboxToInboxDtoResponse(testInbox1)).thenReturn(testInboxDtoResponse1);
    when(mapper.inboxToInboxDtoResponse(testInbox2)).thenReturn(testInboxDtoResponse2);
    when(mapper.inboxToInboxDtoResponse(testInbox3)).thenReturn(testInboxDtoResponse3);
    when(mapper.inboxToInboxDtoResponse(testInbox4)).thenReturn(testInboxDtoResponse4);

    List<InboxDtoResponse> testFindInbox = inboxServiceImpl.getInboxesByInboxUid(inboxUidTest);

    Assert.assertEquals(4, testFindInbox.size());
    Assert.assertEquals(Integer.valueOf(2), testFindInbox.get(0).getUserId());
    Assert.assertEquals(Integer.valueOf(3), testFindInbox.get(1).getUserId());
    Assert.assertEquals(Integer.valueOf(4), testFindInbox.get(2).getUserId());
    Assert.assertEquals(Integer.valueOf(5), testFindInbox.get(3).getUserId());
  }

  @Test
  void saveNewInbox() {

    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Message testMessage = new Message();
    testMessage.setMessageText(null);
    Inbox testInboxSender = new Inbox();
    testInboxSender.setInboxUid(testUser1);
    testInboxSender.setLastMessage(testMessage);
    testInboxSender.setUserId(testUser2);
    Inbox testInboxReceiver = new Inbox();
    testInboxSender.setInboxUid(testUser2);
    testInboxSender.setLastMessage(testMessage);
    testInboxSender.setUserId(testUser1);
    List<Inbox> testInboxes = new ArrayList<>();
    testInboxes.add(testInboxSender);
    testInboxes.add(testInboxReceiver);

    InboxDtoResponse responseTest = new InboxDtoResponse();
    responseTest.setInboxUid(1);
    responseTest.setUserId(2);
    responseTest.setMessage(null);

    when(inboxRepository.findByInboxUidAndUserId(testUser1, testUser2))
        .thenReturn(Optional.empty());
    when(inboxRepository.save(any(Inbox.class))).thenAnswer(invocation -> invocation.getArgument(0));

    List<Inbox> testSaveInboxes = inboxServiceImpl.saveInbox(testUser1, testUser2, testMessage);

    Assert.assertEquals(2, testSaveInboxes.size());
    Assert.assertEquals(null, testSaveInboxes.get(0).getLastMessage().getMessageText());
    Assert.assertEquals(null, testSaveInboxes.get(1).getLastMessage().getMessageText());
    Assert.assertEquals(Optional.of(1), Optional.of(testSaveInboxes.get(0).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2),  Optional.of(testSaveInboxes.get(1).getInboxUid().getUserId()));
    Assert.assertEquals(Optional.of(2), Optional.of(testSaveInboxes.get(0).getUserId().getUserId()));
    Assert.assertEquals(Optional.of(1),  Optional.of(testSaveInboxes.get(1).getUserId().getUserId()));
  }

}