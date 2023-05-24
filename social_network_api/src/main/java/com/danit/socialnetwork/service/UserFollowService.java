package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.UserFollow;

import java.util.List;
import java.util.Optional;

public interface UserFollowService {

  String saveUserFollower(UserFollow userFollow);

  List<UserFollowDtoResponse> getAllUsersByUserFollowerId(Integer userFollowerId);

  List<UserFollowDtoResponse> getAllUsersByUserFollowingId(Integer userFollowingId);

  Optional<UserFollow> getUserFollowByUserFollowerIdAndUserFollowingId(
      Integer userFollower, Integer userFollowing);

  List<UserFollow> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId, boolean notify);

  public String deleteUserFollowByUserFollowId(Integer userFollowId);
}