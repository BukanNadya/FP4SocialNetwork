package com.danit.socialnetwork.dto.post;

import lombok.Data;

@Data
public class PostDtoSave {
  private Integer userId;
  private String writtenText;
  private byte [] photoFileByteArray;

}
