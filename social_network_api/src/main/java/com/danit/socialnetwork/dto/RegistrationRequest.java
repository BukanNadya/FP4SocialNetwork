package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class RegistrationRequest {
  private String username;
  private String password;
  private String email;
  private String name;
  private Integer day;
  private Integer month;
  private Integer year;

}
