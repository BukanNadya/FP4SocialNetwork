package com.danit.socialnetwork.dto.search;

import com.danit.socialnetwork.model.DbUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class SearchDtoResponse {
  private Integer userId;
  private String username;
  private byte[] profileImageUrl;

  public static List<SearchDtoResponse> from(List<DbUser> users) {
    return users.stream().map(u -> {
      SearchDtoResponse searchDtoResponse = new SearchDtoResponse();
      searchDtoResponse.setUserId(u.getUserId());
      searchDtoResponse.setUsername(u.getUsername());
      String photoFile = u.getProfileImageUrl();
      if (photoFile == null) {
        searchDtoResponse.setProfileImageUrl(null);
      } else {
        searchDtoResponse.setProfileImageUrl(Base64.getDecoder().decode(u.getProfileImageUrl()));
      }
      return searchDtoResponse;
    }).toList();
  }
}
