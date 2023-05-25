package com.danit.socialnetwork.dto.search;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchDto {
  private Integer userId;
  private String username;
  private byte[] profileImageUrl;

  public SearchDto(Integer userId, String username, byte[] profileImageUrl) {
    this.userId = userId;
    this.username = username;
    this.profileImageUrl = profileImageUrl;
  }
}
