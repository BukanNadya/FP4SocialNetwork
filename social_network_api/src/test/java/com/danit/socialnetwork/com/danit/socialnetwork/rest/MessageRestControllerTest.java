package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.message.InboxDtoRequest;
import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.InboxRepository;
import com.danit.socialnetwork.service.InboxParticipantsService;
import com.danit.socialnetwork.service.InboxService;
import com.danit.socialnetwork.service.MessageService;
import com.danit.socialnetwork.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class MessageRestControllerTest {

  @Mock
  private MessageService messageService;

  @Mock
  private InboxService inboxService;

  @Mock
  UserService userService;

  @Mock
  private InboxRepository inboxRepository;

  @Mock
  private InboxParticipantsService inboxParticipantsService;

  @InjectMocks
  private MessageRestController controller;

  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  void addMessage() throws Exception {
    Integer inboxUid = 28;
    Integer userId = 34;
    String message = "Hello World!";

    MessageDtoRequest messageDtoRequest = new MessageDtoRequest();
    messageDtoRequest.setInboxUid(inboxUid);
    messageDtoRequest.setUserId(userId);
    messageDtoRequest.setWrittenMessage(message);

    Message testSaveMessage = new Message();
    testSaveMessage.setInboxUid(inboxUid);
    testSaveMessage.setUserId(userId);
    testSaveMessage.setMessage(message);

    when(messageService.saveMessage(any(Message.class))).thenReturn(testSaveMessage);

    mockMvc.perform(post("/message")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(messageDtoRequest)))
        .andExpect(status().isCreated());

    verify(messageService).saveMessage(testSaveMessage);
  }

  @Test
  void getInbox() throws Exception {
    Integer inboxUid = 28;

    InboxDtoRequest inboxDtoRequest = new InboxDtoRequest();
    inboxDtoRequest.setInboxUid(inboxUid);

    Inbox inbox1 = new Inbox();
    inbox1.setInboxUid(inboxUid);
    inbox1.setLastSentUserId(34);
    inbox1.setLastMessage("Hello!!!");
    Inbox inbox2 = new Inbox();
    inbox2.setInboxUid(inboxUid);
    inbox1.setLastSentUserId(36);
    inbox2.setLastMessage("Hello)))");

    List<Inbox> testInboxes = new ArrayList<>();
    testInboxes.add(inbox1);
    testInboxes.add(inbox2);

    when(inboxService.getInboxesByInboxUid(inboxUid)).thenReturn(testInboxes);

    mockMvc.perform(get("/inbox")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(inboxDtoRequest)))
        .andExpect(status().isOk());

    verify(inboxService)
        .getInboxesByInboxUid(inboxUid);
  }

  @Test
  void getMessage() throws Exception {
    Integer inboxUid = 28;
    Integer userId = 34;

    InboxParticipantsDtoRequest inboxParticipantsDtoRequest = new InboxParticipantsDtoRequest();
    inboxParticipantsDtoRequest.setInboxUid(inboxUid);
    inboxParticipantsDtoRequest.setUserId(userId);

    Message message1 = new Message();
    message1.setInboxUid(inboxUid);
    message1.setUserId(userId);
    message1.setMessage("Hello!!!");
    message1.setCreatedAt(null);
    Message message2 = new Message();
    message2.setInboxUid(userId);
    message2.setUserId(inboxUid);
    message2.setMessage("Hello)))");
    message2.setCreatedAt(null);

    List<Message> testMessages = new ArrayList<>();
    testMessages.add(message1);
    testMessages.add(message2);

    when(messageService
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(inboxUid, userId, inboxUid, userId))
        .thenReturn(testMessages);

    mockMvc.perform(get("/message")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(inboxParticipantsDtoRequest)))
        .andExpect(status().isOk());

    verify(messageService)
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(inboxUid, userId, inboxUid, userId);
  }

}