package com.danit.socialnetwork.dto.user;

import com.danit.socialnetwork.model.DbUser;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
public class UserDtoResponse {

  private String username;

  private String name;

  private LocalDateTime createdDateTime;

  private byte[] profileBackgroundImageByteArray;

  private byte[] profileImageByteArray;

  private Integer followers;
  private Integer followings;

  public static UserDtoResponse from(DbUser dbUser) {
    UserDtoResponse userDtoResponse = new UserDtoResponse();
    userDtoResponse.setName(dbUser.getName());
    userDtoResponse.setUsername(dbUser.getUsername());
    userDtoResponse.setCreatedDateTime(dbUser.getCreatedDate());
    if (dbUser.getProfileImageUrl() != null) {
      userDtoResponse.setProfileImageByteArray(Base64.getDecoder()
          .decode(dbUser.getProfileImageUrl()));
    } else {
      userDtoResponse.setProfileImageByteArray(new byte[]{});
    }
    if (dbUser.getProfileBackgroundImageUrl() != null) {
      userDtoResponse.setProfileBackgroundImageByteArray(Base64.getDecoder()
          .decode(dbUser.getProfileBackgroundImageUrl()));
    } else {
      userDtoResponse.setProfileBackgroundImageByteArray(new byte[]{});
    }
    return userDtoResponse;
  }


}
