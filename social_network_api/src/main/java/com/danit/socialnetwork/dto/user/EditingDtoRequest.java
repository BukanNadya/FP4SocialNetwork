package com.danit.socialnetwork.dto.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EditingDtoRequest {
  private Integer userId;
  private String name;
  private LocalDate dateOfBirth;
  private byte [] profileBackgroundImageUrl;
  private byte [] profileImageUrl;

}
