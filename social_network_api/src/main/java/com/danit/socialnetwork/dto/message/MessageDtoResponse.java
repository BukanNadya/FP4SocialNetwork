package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.Message;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MessageDtoResponse {
  private Integer inboxUid;
  private Integer userId;
  private String writtenMessage;
  private LocalDateTime createdAt;

  public static MessageDtoResponse from(Message message) {
    MessageDtoResponse messageDto = new MessageDtoResponse();
    messageDto.setInboxUid(message.getInboxUid());
    messageDto.setUserId(message.getUserId());
    messageDto.setWrittenMessage(message.getMessage());
    messageDto.setCreatedAt(message.getCreatedAt());
    return messageDto;
  }

}
