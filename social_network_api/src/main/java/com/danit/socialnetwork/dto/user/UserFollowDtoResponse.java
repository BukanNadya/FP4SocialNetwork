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

  private String profileImageLink;

  public static UserFollowDtoResponse fromUserFollowing(UserFollow userFollowing) {
    UserFollowDtoResponse userFollowDtoResponse = new UserFollowDtoResponse();
    userFollowDtoResponse.setUserId(userFollowing.getUserFollowingId().getUserId());
    userFollowDtoResponse.setName(userFollowing.getUserFollowingId().getName());
    userFollowDtoResponse.setUsername(userFollowing.getUserFollowingId().getUsername());
    userFollowDtoResponse.setProfileImageLink(userFollowing.getUserFollowingId().getProfileImageUrl());
    return userFollowDtoResponse;
  }


  public static UserFollowDtoResponse fromUserFollower(UserFollow userFollower) {
    UserFollowDtoResponse userFollowDtoResponse = new UserFollowDtoResponse();
    userFollowDtoResponse.setUserId(userFollower.getUserFollowerId().getUserId());
    userFollowDtoResponse.setName(userFollower.getUserFollowerId().getName());
    userFollowDtoResponse.setUsername(userFollower.getUserFollowerId().getUsername());
    userFollowDtoResponse.setProfileImageLink(userFollower.getUserFollowerId().getProfileImageUrl());
    return userFollowDtoResponse;
  }


}
