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
  private String profileBackgroundImageLink;
  private String profileImageLink;
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
    userDtoResponse.setProfileImageLink(dbUser.getProfileImageUrl());
    userDtoResponse.setProfileBackgroundImageLink(dbUser.getProfileBackgroundImageUrl());
    return userDtoResponse;
  }

}
