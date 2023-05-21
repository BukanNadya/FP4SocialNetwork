package com.danit.socialnetwork.dto.message;

import lombok.Data;

@Data
public class InboxDtoRequest {
  private Integer inboxUid;   // inboxUid = sender_id (current user)
}
