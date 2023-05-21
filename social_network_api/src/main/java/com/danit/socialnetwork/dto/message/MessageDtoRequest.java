package com.danit.socialnetwork.dto.message;

import lombok.Data;

@Data
public class MessageDtoRequest {
  private Integer inboxUid;   // inboxUid = sender_id (current user)
  private Integer userId;     // userId = receiver_id
  private String writtenMessage;
}
