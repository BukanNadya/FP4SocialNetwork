package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.Message;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class MessageGetAllDtoResponse {
  private Integer inboxUid;
  private Integer userId;
  private String writtenMessage;
  private LocalDateTime createdAt;

  public static List<MessageGetAllDtoResponse> from(List<Message> messages) {
    List<MessageGetAllDtoResponse> messagesDto = new ArrayList<>();
    for (Message message : messages) {
      MessageGetAllDtoResponse messageGetAllDtoResponse = new MessageGetAllDtoResponse();
      messageGetAllDtoResponse.setInboxUid(message.getInboxUid());
      messageGetAllDtoResponse.setUserId(message.getUserId());
      messageGetAllDtoResponse.setWrittenMessage(message.getMessage());
      messageGetAllDtoResponse.setCreatedAt(message.getCreatedAt());
      messagesDto.add(messageGetAllDtoResponse);
    }
    return messagesDto;
  }
}
