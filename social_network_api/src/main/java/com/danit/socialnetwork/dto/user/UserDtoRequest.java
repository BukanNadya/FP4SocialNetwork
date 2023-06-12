package com.danit.socialnetwork.dto.user;

import lombok.Data;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

@Data
public class UserDtoRequest {
  @NotBlank(message = "name is required")
  @Size(max = 50, message = "name cannot exceed 50 characters")
  private String name;
  @Min(1)
  @Max(31)
  @NotNull(message = "day is required")
  private Integer day;
  @Min(1)
  @Max(12)
  @NotNull(message = "month is required")
  private Integer month;
  @Min(1900)
  @Max(2100)
  @NotNull(message = "year is required")
  private Integer year;
}
