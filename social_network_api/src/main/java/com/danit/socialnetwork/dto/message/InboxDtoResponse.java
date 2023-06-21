package com.danit.socialnetwork.dto.message;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InboxDtoResponse {
  private Integer inboxId;
  private Integer userId;
  private Integer inboxUid;
  private String username;
  private String name;
  private String profileImageUrl;
  private String message;
  private LocalDateTime createdAt;

  public InboxDtoResponse(Integer inboxId, Integer userId, Integer inboxUid, String username,
                          String name, String profileImageUrl, String message, LocalDateTime createdAt) {
    this.inboxId = inboxId;
    this.userId = userId;
    this.inboxUid = inboxUid;
    this.username = username;
    this.name = name;
    this.profileImageUrl = profileImageUrl;
    this.message = message;
    this.createdAt = createdAt;
  }
}
