package com.danit.socialnetwork.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserEmailRequest extends UserEmailForLoginRequest {
  @NotBlank(message = "name is required")
  @Size(max = 50, message = "name cannot exceed 50 characters")
  private String name;
}
