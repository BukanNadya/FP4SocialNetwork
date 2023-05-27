package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class UserDobChangeRequest {
  private Integer userId;
  private Integer day;
  private Integer month;
  private Integer year;
}
