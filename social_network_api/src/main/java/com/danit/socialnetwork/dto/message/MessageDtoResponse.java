package com.danit.socialnetwork.dto.message;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MessageDtoResponse {
  private Integer inboxUid;
  private Integer userId;
  private String message;
  private LocalDateTime createdAt;

  public MessageDtoResponse(Integer inboxUid, Integer userId, String message, LocalDateTime createdAt) {
    this.inboxUid = inboxUid;
    this.userId = userId;
    this.message = message;
    this.createdAt = createdAt;
  }
}
