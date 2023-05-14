package com.danit.socialnetwork.dto.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDtoRequest {
  private String username;
  private LocalDateTime createdDate;
  private String address;

}
