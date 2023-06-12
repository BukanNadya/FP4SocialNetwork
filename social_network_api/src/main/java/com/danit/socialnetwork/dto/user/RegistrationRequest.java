package com.danit.socialnetwork.dto.user;

import lombok.Data;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Email;

@Data
public class RegistrationRequest extends UserDtoRequest {
  @NotBlank(message = "username is required")
  @Size(max = 50, message = "username cannot exceed 50 characters")
  private String username;
  @NotBlank(message = "password is required")
  @Size(min = 7, message = "password must have at least 7 characters")
  private String password;
  @NotBlank(message = "email is required")
  @Email(message = "invalid email format")
  private String email;
}
