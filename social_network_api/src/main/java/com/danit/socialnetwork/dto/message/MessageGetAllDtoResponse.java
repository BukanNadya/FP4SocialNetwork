package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.Message;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class MessageGetAllDtoResponse {
  private Integer inboxUid;
  private Integer userId;
  private String writtenMessage;
  private LocalDateTime createdAt;

  public static List<MessageGetAllDtoResponse> from(List<Message> messages) {
    return messages.stream().map(m -> {
      MessageGetAllDtoResponse messageGetAllDtoResponse = new MessageGetAllDtoResponse();
      messageGetAllDtoResponse.setInboxUid(m.getInboxUid());
      messageGetAllDtoResponse.setUserId(m.getUserId());
      messageGetAllDtoResponse.setWrittenMessage(m.getMessage());
      messageGetAllDtoResponse.setCreatedAt(m.getCreatedAt());
      return messageGetAllDtoResponse;
    }).toList();
  }

}
