package com.danit.socialnetwork.dto.search;

import lombok.Data;

@Data
public class SearchRequest {
  private String userId;
  private String search;

}