package com.danit.socialnetwork.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class EditingDtoRequest {
  private Integer userId;
  private String name;
  private Integer day;
  private Integer month;
  private Integer year;
  private String address;
  private byte [] profileBackgroundImageUrl;
  private byte [] profileImageUrl;

}
