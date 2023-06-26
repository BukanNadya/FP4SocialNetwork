package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class PasswordChangeRequest {
  private Integer userId;
  private String newPassword;
  private String currentPassword;
}
