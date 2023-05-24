package com.danit.socialnetwork.dto.user;

import com.danit.socialnetwork.model.UserFollow;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Base64;

@Data
@NoArgsConstructor
@Log4j2
public class UserFollowDtoResponse {

  private Integer userId;

  private String username;

  private String name;

  private byte[] profileImageByteArray;

  public static UserFollowDtoResponse fromUserFollowing(UserFollow userFollowing) {
    UserFollowDtoResponse userFollowDtoResponse = new UserFollowDtoResponse();
    userFollowDtoResponse.setUserId(userFollowing.getUserFollowingId().getUserId());
    userFollowDtoResponse.setName(userFollowing.getUserFollowingId().getName());
    userFollowDtoResponse.setUsername(userFollowing.getUserFollowingId().getUsername());
    if (userFollowing.getUserFollowingId().getProfileImageUrl() != null) {
      userFollowDtoResponse.setProfileImageByteArray(Base64.getDecoder()
          .decode(userFollowing.getUserFollowingId().getProfileImageUrl()));
    } else {
      userFollowDtoResponse.setProfileImageByteArray(null);
    }
    return userFollowDtoResponse;
  }


  public static UserFollowDtoResponse fromUserFollower(UserFollow userFollower) {
    UserFollowDtoResponse userFollowDtoResponse = new UserFollowDtoResponse();
    userFollowDtoResponse.setUserId(userFollower.getUserFollowerId().getUserId());
    userFollowDtoResponse.setName(userFollower.getUserFollowerId().getName());
    userFollowDtoResponse.setUsername(userFollower.getUserFollowerId().getUsername());
    if (userFollower.getUserFollowerId().getProfileImageUrl() != null) {
      userFollowDtoResponse.setProfileImageByteArray(Base64.getDecoder()
          .decode(userFollower.getUserFollowingId().getProfileImageUrl()));
    } else {
      userFollowDtoResponse.setProfileImageByteArray(null);
    }
    return userFollowDtoResponse;
  }


}
