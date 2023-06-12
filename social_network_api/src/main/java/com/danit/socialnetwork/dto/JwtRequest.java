package com.danit.socialnetwork.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class JwtRequest {
  @NotBlank(message = "email is required")
  @Email(message = "invalid email format")
  private String email;
  @NotBlank(message = "password is required")
  @Size(min = 7, message = "password must have at least 7 characters")
  private String password;
  private String rememberMe;

}