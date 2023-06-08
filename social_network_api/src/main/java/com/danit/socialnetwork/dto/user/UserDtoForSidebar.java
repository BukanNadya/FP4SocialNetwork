package com.danit.socialnetwork.dto.user;

import com.danit.socialnetwork.model.DbUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@NoArgsConstructor
public class UserDtoForSidebar {

  private Integer userId;

  private String username;

  private String name;

  private String profileImageLink;


  public static UserDtoForSidebar from(DbUser dbUser) {
    UserDtoForSidebar userDtoResponse = new UserDtoForSidebar();
    userDtoResponse.setName(dbUser.getName());
    userDtoResponse.setUsername(dbUser.getUsername());
    userDtoResponse.setUserId(dbUser.getUserId());
    userDtoResponse.setProfileImageLink(dbUser.getProfileImageUrl());
    return userDtoResponse;
  }

}
