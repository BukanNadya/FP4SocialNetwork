package com.danit.socialnetwork.dto.message.search;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MessageSearchDto {
  private Integer userId;
  private String username;
  private String name;
  private byte[] profileImageUrl;
  private String message;
  private LocalDateTime createdAt;  // create message

  public MessageSearchDto(Integer userId, String username, String name,
                          byte[] profileImageUrl, String message, LocalDateTime createdAt) {
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.profileImageUrl = profileImageUrl;
    this.message = message;
    this.createdAt = createdAt;
  }
}
