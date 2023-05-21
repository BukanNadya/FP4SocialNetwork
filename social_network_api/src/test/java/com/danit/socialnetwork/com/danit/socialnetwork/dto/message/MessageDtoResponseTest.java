package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MessageDtoResponseTest {
  @InjectMocks
  MessageDtoResponse messageDtoResponse;

  @Mock
  UserService userService;

  @Test
  void from() {
    Message testMessage = new Message();
    testMessage.setInboxUid(28);
    testMessage.setUserId(34);
    testMessage.setMessage("Hallo world!");
    testMessage.setCreatedAt(null);

    MessageDtoResponse testMessageDto = new MessageDtoResponse();
    testMessageDto.setInboxUid(testMessage.getInboxUid());
    testMessageDto.setUserId(testMessage.getUserId());
    testMessageDto.setWrittenMessage(testMessage.getMessage());
    testMessageDto.setCreatedAt(testMessage.getCreatedAt());

    MessageDtoResponse testMessageConvert = new MessageDtoResponse().from(testMessage);

    Assert.assertEquals(testMessageDto, testMessageConvert);
  }
}