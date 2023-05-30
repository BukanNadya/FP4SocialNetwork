package com.danit.socialnetwork.dto.user;

import com.danit.socialnetwork.model.DbUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
public class UserDtoResponse {

  private String username;

  private String name;

  private LocalDateTime createdDateTime;

  private LocalDate dateOfBirth;

  private Integer userId;
  private String address;
  private byte[] profileBackgroundImageByteArray;
  private byte[] profileImageByteArray;
  private Integer followers;
  private Integer followings;

  public static UserDtoResponse from(DbUser dbUser) {
    UserDtoResponse userDtoResponse = new UserDtoResponse();
    userDtoResponse.setName(dbUser.getName());
    userDtoResponse.setUsername(dbUser.getUsername());
    userDtoResponse.setUserId(dbUser.getUserId());
    userDtoResponse.setCreatedDateTime(dbUser.getCreatedDate());
    userDtoResponse.setDateOfBirth(dbUser.getDateOfBirth());
    userDtoResponse.setAddress(dbUser.getAddress());
    if (dbUser.getProfileImageUrl() != null) {
      userDtoResponse.setProfileImageByteArray(Base64.getDecoder()
          .decode(dbUser.getProfileImageUrl()));
    } else {
      userDtoResponse.setProfileImageByteArray(null);
    }
    if (dbUser.getProfileBackgroundImageUrl() != null) {
      userDtoResponse.setProfileBackgroundImageByteArray(Base64.getDecoder()
          .decode(dbUser.getProfileBackgroundImageUrl()));
    } else {
      userDtoResponse.setProfileBackgroundImageByteArray(null);
    }
    return userDtoResponse;
  }

}
