package com.danit.socialnetwork.dto.search;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class SearchRequest {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private String userId;
  private String search;

}