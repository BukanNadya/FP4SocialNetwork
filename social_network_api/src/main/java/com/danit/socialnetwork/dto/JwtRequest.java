package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class JwtRequest {
  private String email;
  private String password;
  private String rememberMe;

}