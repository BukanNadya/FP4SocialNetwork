package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class MessageGetAllDtoResponseTest {

  @InjectMocks
  MessageGetAllDtoResponse messageGetAllDtoResponse;

  @Mock
  UserService userService;

  @Test
  void from() {
    Message testMessage1 = new Message(28, 34, "Hallo !!!", null);
    Message testMessage2 = new Message(34, 28, "Hallo )))", null);

    List<Message> testMessages = new ArrayList<>();
    testMessages.add(testMessage1);
    testMessages.add(testMessage2);

    MessageGetAllDtoResponse testMessageResponse1 = new MessageGetAllDtoResponse();
    testMessageResponse1.setInboxUid(28);
    testMessageResponse1.setUserId(34);
    testMessageResponse1.setWrittenMessage("Hallo !!!");
    testMessageResponse1.setCreatedAt(null);
    MessageGetAllDtoResponse testMessageResponse2 = new MessageGetAllDtoResponse();
    testMessageResponse2.setInboxUid(34);
    testMessageResponse2.setUserId(28);
    testMessageResponse2.setWrittenMessage("Hallo )))");
    testMessageResponse2.setCreatedAt(null);

    List<MessageGetAllDtoResponse> testMessagesResponse = new ArrayList<>();
    testMessagesResponse.add(testMessageResponse1);
    testMessagesResponse.add(testMessageResponse2);

    List<MessageGetAllDtoResponse> messagesConvert = new MessageGetAllDtoResponse().from(testMessages);

    Assert.assertEquals(testMessagesResponse, messagesConvert);
  }
}