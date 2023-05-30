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

  private byte[] profileImageByteArray;


  public static UserDtoForSidebar from(DbUser dbUser) {
    UserDtoForSidebar userDtoResponse = new UserDtoForSidebar();
    userDtoResponse.setName(dbUser.getName());
    userDtoResponse.setUsername(dbUser.getUsername());
    userDtoResponse.setUserId(dbUser.getUserId());
    if (dbUser.getProfileImageUrl() != null) {
      userDtoResponse.setProfileImageByteArray(Base64.getDecoder()
          .decode(dbUser.getProfileImageUrl()));
    } else {
      userDtoResponse.setProfileImageByteArray(null);
    }
    return userDtoResponse;

  }

}
