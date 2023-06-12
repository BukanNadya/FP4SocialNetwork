package com.danit.socialnetwork.dto.user;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class EditingDtoRequest extends UserDtoRequest {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer userId;
  @Size(max = 100, message = "address cannot exceed 100 characters")
  private String address;
  private byte [] profileBackgroundImageUrl;
  private byte [] profileImageUrl;
  @URL
  private String profileBackgroundImageUrlString;
  @URL
  private String profileImageUrlString;
}
