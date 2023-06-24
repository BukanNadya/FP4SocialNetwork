package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.service.MessageService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

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
  private Integer messageId;
  private String message;
  private LocalDateTime createdAt;
  private Integer unreadByUser;

  public InboxDtoResponse(Integer inboxId, Integer userId, Integer inboxUid,
                          String username, String name, String profileImageUrl, Integer messageId,
                          String message, LocalDateTime createdAt, Integer unreadByUser) {
    this.inboxId = inboxId;
    this.userId = userId;
    this.inboxUid = inboxUid;
    this.username = username;
    this.name = name;
    this.profileImageUrl = profileImageUrl;
    this.messageId = messageId;
    this.message = message;
    this.createdAt = createdAt;
    this.unreadByUser = unreadByUser;
  }
}
