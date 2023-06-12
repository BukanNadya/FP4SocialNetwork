package com.danit.socialnetwork.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@NoArgsConstructor
public class UserDtoForSidebar {

  private Integer userId;

  private String username;

  private String name;

  private String profileImageLink;

  private Boolean isFollowed;

  private Integer countFollowers;


  public static UserDtoForSidebar from(Object[] result) {
    UserDtoForSidebar userDtoForSidebar = new UserDtoForSidebar();
    userDtoForSidebar.setUserId((Integer) result[0]);
    userDtoForSidebar.setName((String) result[1]);
    userDtoForSidebar.setUsername((String) result[2]);
    userDtoForSidebar.setProfileImageLink((String) result[3]);
    try {
      userDtoForSidebar.setIsFollowed((Boolean) result[4].equals("true"));
    } catch (RuntimeException exc) {
      userDtoForSidebar.setIsFollowed(null);
    }
    userDtoForSidebar.setCountFollowers(((BigInteger) result[5]).intValue());
    return userDtoForSidebar;
  }

}
