package com.danit.socialnetwork.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ActivateCodeRequest {
  @NotNull(message = "code is required")
  @Size(min = 6, max = 6, message = "code must be equal to 6")
  private Integer code;
}
