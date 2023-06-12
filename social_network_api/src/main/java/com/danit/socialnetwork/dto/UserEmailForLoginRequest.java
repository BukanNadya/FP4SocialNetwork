package com.danit.socialnetwork.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserEmailForLoginRequest {
  @NotBlank(message = "email is required")
  @Email(message = "invalid email format")
  private String email;
}
