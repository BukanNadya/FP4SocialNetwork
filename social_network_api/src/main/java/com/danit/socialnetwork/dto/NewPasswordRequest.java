package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class NewPasswordRequest {
  private String email;
  private String password;
}
