package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class UserFollowRequest {
  Integer userFollower;
  Integer userFollowing;
}