package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoResponse;
import com.danit.socialnetwork.dto.message.search.MessageSearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.mappers.MessageMapperImpl;
import com.danit.socialnetwork.mappers.MessageSearchMapper;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.MessageRepository;
import com.danit.socialnetwork.repository.UserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.danit.socialnetwork.config.GuavaCache.messageCache;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MessageServiceImplTest {
  @InjectMocks
  MessageServiceImpl messageService;
  @Mock
  MessageRepository messageRepository;
  @Mock
  InboxServiceImpl inboxService;
  @Mock
  UserRepository userRepository;
  @Mock
  MessageMapperImpl messageMapper;
  @Mock
  MessageSearchMapper messageSearchMapper;
  @Mock
  SimpMessagingTemplate messagingTemplate;
  @Mock
  Pageable pageable;

  @Test
  void saveMessage() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    Message testMessage = new Message();
    testMessage.setInboxUid(testUser1);
    testMessage.setUserId(testUser2);
    testMessage.setMessageId(1);
    testMessage.setMessageText("Hello world!");
    MessageDtoRequest request = new MessageDtoRequest();
    request.setInboxUid(1);
    request.setUserId(2);
    request.setWrittenMessage("Hello world!");
    MessageDtoResponse testMessageDto = new MessageDtoResponse(
        1, 2, 1, "Hello world!", null);

    Inbox testInbox1 = new Inbox(testUser1, testUser2, testMessage);
    Inbox testInbox2 = new Inbox(testUser2, testUser1, testMessage);
    List<Inbox> inboxes = new ArrayList<>();
    inboxes.add(testInbox1);
    inboxes.add(testInbox2);

    when(userRepository.findById(1)).thenReturn(Optional.of(testUser1));
    when(userRepository.findById(2)).thenReturn(Optional.of(testUser2));
    when(inboxService.saveInbox(any(DbUser.class), any(DbUser.class), any(Message.class)))
        .thenReturn(inboxes);
    when(messageRepository.save(any(Message.class))).thenReturn(testMessage);
    doReturn(testMessageDto)
        .when(messageMapper)
        .messageToMessageDtoResponse(Mockito.any(Message.class));

    MessageDtoResponse savedMessage = messageService.saveMessage(request);
    Mockito.verify(messageRepository).save(Mockito.any(Message.class));

    Assert.assertEquals("Hello world!", savedMessage.getMessage());
  }

  @Test
  void findByInboxUidAndUserIdOrUserIdAndInboxUid_shouldFindAllMessagesByTwoUsers() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    DbUser testUser3 = new DbUser();
    testUser3.setUserId(2);
    Message testMessage1 = new Message();
    testMessage1.setInboxUid(testUser1);
    testMessage1.setUserId(testUser2);
    testMessage1.setMessageText("Hallo");
    Message testMessage2 = new Message();
    testMessage2.setInboxUid(testUser1);
    testMessage2.setUserId(testUser2);
    testMessage2.setMessageText("world!");
    Message testMessage3 = new Message();
    testMessage3.setInboxUid(testUser1);
    testMessage3.setUserId(testUser2);
    testMessage3.setMessageText("Test!");
    Message testMessage4 = new Message();
    testMessage4.setInboxUid(testUser1);
    testMessage4.setUserId(testUser2);
    testMessage4.setMessageText("Test2!");
    List<Message> testMessages = new ArrayList<>();
    testMessages.add(testMessage1);
    testMessages.add(testMessage2);
    testMessages.add(testMessage3);
    testMessages.add(testMessage4);

    InboxParticipantsDtoRequest request = new InboxParticipantsDtoRequest();
    request.setInboxUid(1);
    request.setUserId(2);

    MessageDtoResponse testMessageDto1 = new MessageDtoResponse();
    testMessageDto1.setInboxUid(1);
    testMessageDto1.setUserId(2);
    testMessageDto1.setMessage("Hallo");
    MessageDtoResponse testMessageDto2 = new MessageDtoResponse();
    testMessageDto2.setInboxUid(2);
    testMessageDto2.setUserId(1);
    testMessageDto2.setMessage("world!");
    MessageDtoResponse testMessageDto3 = new MessageDtoResponse();
    testMessageDto3.setInboxUid(2);
    testMessageDto3.setUserId(1);
    testMessageDto3.setMessage("Test!");
    MessageDtoResponse testMessageDto4 = new MessageDtoResponse();
    testMessageDto4.setInboxUid(1);
    testMessageDto4.setUserId(2);
    testMessageDto4.setMessage("Test2!");
    Integer page = 0;
    int pageSize = 16;
    int offset = page * pageSize;

    when(userRepository.findById(1)).thenReturn(Optional.of(testUser1));
    when(userRepository.findById(2)).thenReturn(Optional.of(testUser2));
    when(messageRepository
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(
            testUser1, testUser2, testUser1, testUser2, offset, pageSize))
        .thenReturn(testMessages);
    when(messageMapper.messageToMessageDtoResponse(testMessage1)).thenReturn(testMessageDto1);
    when(messageMapper.messageToMessageDtoResponse(testMessage2)).thenReturn(testMessageDto2);
    when(messageMapper.messageToMessageDtoResponse(testMessage3)).thenReturn(testMessageDto3);
    when(messageMapper.messageToMessageDtoResponse(testMessage4)).thenReturn(testMessageDto4);

    List<MessageDtoResponse> testFindMessages = messageService
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(request, page);
    Assert.assertEquals(4, testFindMessages.size());
    Assert.assertEquals("Hallo", testFindMessages.get(0).getMessage());
    Assert.assertEquals("world!", testFindMessages.get(1).getMessage());
    Assert.assertEquals("Test!", testFindMessages.get(2).getMessage());
    Assert.assertEquals("Test2!", testFindMessages.get(3).getMessage());
    Assert.assertEquals(Optional.of(1), Optional.of(testFindMessages.get(0).getInboxUid()));
    Assert.assertEquals(Optional.of(2), Optional.of(testFindMessages.get(0).getUserId()));
    Assert.assertEquals(Optional.of(2), Optional.of(testFindMessages.get(1).getInboxUid()));
    Assert.assertEquals(Optional.of(1), Optional.of(testFindMessages.get(1).getUserId()));
  }

  @Test
  void filterCachedUsersByName_WhenExists() {
    String StringSearch1 = "nad";
    SearchRequest request1 = new SearchRequest();
    request1.setUserId("2");
    request1.setSearch(StringSearch1);
    String StringSearch2 = "ro";
    SearchRequest request2 = new SearchRequest();
    request2.setUserId("1");
    request2.setSearch(StringSearch2);

    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    testUser1.setUsername("NNN");
    testUser1.setName("Nadya");
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    testUser2.setUsername("RRR");
    testUser2.setName("Ron");
    DbUser testUser3 = new DbUser();
    testUser3.setUserId(3);
    testUser3.setUsername("Dima");
    testUser3.setName("DDD");

    Message testMessage1 = new Message();
    testMessage1.setInboxUid(testUser3);
    testMessage1.setUserId(testUser2);
    testMessage1.setMessageText("Nadya");
    Message testMessage2 = new Message();
    testMessage2.setInboxUid(testUser2);
    testMessage2.setUserId(testUser1);
    testMessage2.setMessageText("Test");
    Message testMessage3 = new Message();
    testMessage3.setInboxUid(testUser2);
    testMessage3.setUserId(testUser3);
    testMessage3.setMessageText("Ron");
    Message testMessage4 = new Message();
    testMessage4.setInboxUid(testUser3);
    testMessage4.setUserId(testUser2);
    testMessage4.setMessageText("Test");
    Message testMessage5 = new Message();
    testMessage5.setInboxUid(testUser1);
    testMessage5.setUserId(testUser2);
    testMessage5.setMessageText("Roma");

    List<Message> messages = new ArrayList<>();
    messages.add(testMessage1);
    messages.add(testMessage2);
    messages.add(testMessage3);
    messages.add(testMessage4);
    messages.add(testMessage5);

    messageCache.put("MessageCache", messages);

    MessageSearchDto testMessageSearchDto1 = new MessageSearchDto();
    testMessageSearchDto1.setName("DDD");
    testMessageSearchDto1.setUsername("Dima");
    testMessageSearchDto1.setMessage("Nadya");
    MessageSearchDto testMessageSearchDto2 = new MessageSearchDto();
    testMessageSearchDto2.setName("Ron");
    testMessageSearchDto2.setUsername("RRR");
    testMessageSearchDto2.setMessage("Ron");
    MessageSearchDto testMessageSearchDto3 = new MessageSearchDto();
    testMessageSearchDto3.setName("Ron");
    testMessageSearchDto3.setUsername("RRR");
    testMessageSearchDto3.setMessage("Roma");

    when(userRepository.findById(2)).thenReturn(Optional.of(testUser2));
    when(userRepository.findById(1)).thenReturn(Optional.of(testUser1));
    when(messageSearchMapper.messageToMessageSearchDto(testMessage1)).thenReturn(testMessageSearchDto1);
    when(messageSearchMapper.messageToMessageSearchDto(testMessage3)).thenReturn(testMessageSearchDto2);
    when(messageSearchMapper.messageToMessageSearchDto(testMessage5)).thenReturn(testMessageSearchDto3);

    List<MessageSearchDto> resultSearchDto1 = messageService.filterCachedMessageByString(request1);
    List<MessageSearchDto> resultSearchDto2 = messageService.filterCachedMessageByString(request2);

    Assert.assertTrue(resultSearchDto1.size() <= 5);
    Assert.assertTrue(resultSearchDto2.size() <= 5);

    Assert.assertTrue(resultSearchDto1.get(0).getMessage().toUpperCase().contains("nad".toUpperCase()));
    Assert.assertTrue(resultSearchDto2.get(0).getName().toUpperCase().contains("ro".toUpperCase())
        || resultSearchDto2.get(0).getUsername().toUpperCase().contains("ro".toUpperCase()));
    Assert.assertTrue(resultSearchDto2.get(1).getName().toUpperCase().contains("ro".toUpperCase())
        || resultSearchDto2.get(1).getUsername().toUpperCase().contains("ro".toUpperCase()));
    Assert.assertTrue(resultSearchDto2.get(1).getMessage().toUpperCase().contains("ro".toUpperCase()));
  }

  @Test
  void findMessageByInboxUidOrUserId() {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    DbUser testUser3 = new DbUser();
    testUser3.setUserId(2);
    Message testMessage1 = new Message();
    testMessage1.setInboxUid(testUser2);
    testMessage1.setUserId(testUser1);
    testMessage1.setMessageText("Hallo");
    Message testMessage2 = new Message();
    testMessage2.setInboxUid(testUser1);
    testMessage2.setUserId(testUser2);
    testMessage2.setMessageText("world!");
    Message testMessage3 = new Message();
    testMessage3.setInboxUid(testUser2);
    testMessage3.setUserId(testUser1);
    testMessage3.setMessageText("Test!");
    Message testMessage4 = new Message();
    testMessage4.setInboxUid(testUser1);
    testMessage4.setUserId(testUser3);
    testMessage4.setMessageText("Test2!");
    List<Message> testMessages = new ArrayList<>();
    testMessages.add(testMessage1);
    testMessages.add(testMessage2);
    testMessages.add(testMessage3);

    when(messageRepository.findMessageByInboxUidOrUserId(any(DbUser.class), any(DbUser.class))).thenReturn(testMessages);

    List<Message> resultMessages = messageService.findMessageByInboxUidOrUserId(testUser1, testUser2);

    Assert.assertEquals(3, resultMessages.size());
    Assert.assertEquals(Optional.of(testUser2), Optional.of(resultMessages.get(0).getInboxUid()));
    Assert.assertEquals(Optional.of(testUser1), Optional.of(resultMessages.get(0).getUserId()));
    Assert.assertEquals(Optional.of("Hallo"), Optional.of(resultMessages.get(0).getMessageText()));
    Assert.assertEquals(Optional.of(testUser1), Optional.of(resultMessages.get(1).getInboxUid()));
    Assert.assertEquals(Optional.of(testUser2), Optional.of(resultMessages.get(1).getUserId()));
    Assert.assertEquals(Optional.of("world!"), Optional.of(resultMessages.get(1).getMessageText()));
    Assert.assertEquals(Optional.of(testUser2), Optional.of(resultMessages.get(2).getInboxUid()));
    Assert.assertEquals(Optional.of(testUser1), Optional.of(resultMessages.get(2).getUserId()));
    Assert.assertEquals(Optional.of("Test!"), Optional.of(resultMessages.get(2).getMessageText()));
  }
}