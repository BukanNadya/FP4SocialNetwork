package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.dto.message.MessageDtoResponse;
import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.dto.message.search.MessageSearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.service.InboxService;
import com.danit.socialnetwork.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
  MessageService messageService;
  @Mock
  InboxService inboxService;
  @InjectMocks
  private MessageRestController controller;
  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  void addMessage() throws Exception {
    DbUser testUser1 = new DbUser();
    testUser1.setUserId(1);
    DbUser testUser2 = new DbUser();
    testUser2.setUserId(2);
    String message = "Hello World!";

    MessageDtoRequest request = new MessageDtoRequest();
    request.setInboxUid(1);
    request.setUserId(2);
    request.setWrittenMessage(message);

    Message testSaveMessage = new Message();
    testSaveMessage.setInboxUid(testUser1);
    testSaveMessage.setUserId(testUser2);
    testSaveMessage.setMessageText(message);

    MessageDtoResponse testMessageDto = new MessageDtoResponse();
    testMessageDto.setInboxUid(1);
    testMessageDto.setUserId(2);
    testMessageDto.setMessage("Hello World!");

    when(messageService.saveMessage(any(MessageDtoRequest.class))).thenReturn(testMessageDto);

    mockMvc.perform(post("/api/addMessage")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(request)))
        .andExpect(status().isCreated());

    verify(messageService).saveMessage(request);
  }

  @Test
  void getInbox() throws Exception {
    Integer inboxUidTest = 1;
    List<InboxDtoResponse> testInboxDto = new ArrayList<>();

    when(inboxService.getInboxesByInboxUid(inboxUidTest)).thenReturn(testInboxDto);

    mockMvc.perform(get("/api/inbox/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(inboxUidTest)))
        .andExpect(status().isFound());

    verify(inboxService).getInboxesByInboxUid(inboxUidTest);
  }

  @Test
  void getMessage() throws Exception {
    InboxParticipantsDtoRequest request = new InboxParticipantsDtoRequest();
    request.setInboxUid(1);
    request.setUserId(2);
    Integer page = 0;

    mockMvc.perform(post("/api/getMessages")

            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(request)))
        .andExpect(status().isFound());

    verify(messageService).findByInboxUidAndUserIdOrUserIdAndInboxUid(request, page);
  }

  @Test
  void handleMessageSearchPost() throws Exception {
    String StringSearch = "hel";
    SearchRequest request = new SearchRequest();
    request.setSearch(StringSearch);

    MessageSearchDto messageSearchDto1 = new MessageSearchDto();
    messageSearchDto1.setMessage("hello");
    MessageSearchDto messageSearchDto2 = new MessageSearchDto();
    messageSearchDto2.setMessage("hello");
    List<MessageSearchDto> messageSearchDto = new ArrayList<>();
    messageSearchDto.add(messageSearchDto1);
    messageSearchDto.add(messageSearchDto2);

    when(messageService.filterCachedMessageByString(request)).thenReturn(messageSearchDto);

    mockMvc.perform(post("/api/messageSearch")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(request)))
        .andExpect(status().isFound());
  }

}