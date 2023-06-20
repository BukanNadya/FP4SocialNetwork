package com.danit.socialnetwork.dto.post;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class PostDtoSave {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer userId;
  private String writtenText;
  private byte[] photoFileByteArray;

}
