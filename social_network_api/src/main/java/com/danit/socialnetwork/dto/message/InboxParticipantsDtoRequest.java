package com.danit.socialnetwork.dto.message;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class InboxParticipantsDtoRequest {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer inboxUid;   // inboxUid = sender_id (current user)
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer userId;     // userId = receiver_id
}
