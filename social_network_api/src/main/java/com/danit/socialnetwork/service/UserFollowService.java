package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.UserFollower;

import java.util.List;

public interface UserFollowService {

  List<UserFollower> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId);

  List<UserFollower> getAllUserByUserFollowerId(Integer userFollowerId);

  List<UserFollower> getAllUserByUserFollowingId(Integer userFollowingId);

}
