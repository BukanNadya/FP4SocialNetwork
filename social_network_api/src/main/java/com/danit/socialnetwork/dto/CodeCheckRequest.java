package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class CodeCheckRequest {
  private String email;
  private String code;
}
