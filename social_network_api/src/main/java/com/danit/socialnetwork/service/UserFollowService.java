package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.UserNotificationRequest;
import com.danit.socialnetwork.dto.UserUnfollowRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.UserFollow;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserFollowService {

  String saveUserFollower(UserFollow userFollow);

  List<UserFollowDtoResponse> getAllUsersByUserFollowerId(Integer userFollowerId);

  List<UserFollowDtoResponse> getAllUsersByUserFollowingId(Integer userFollowingId);

  Optional<UserFollow> getUserFollowByUserFollowerIdAndUserFollowingId(
      Integer userFollower, Integer userFollowing);

  List<UserFollow> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId, boolean notify);

  String deleteUserFollowByUserFollowId(Integer userFollowId);

  ResponseEntity<Map<String, String>> isFollowing(@RequestBody UserFollowRequest userFollowRequest);

  ResponseEntity<Map<String, String>> follow(@RequestBody UserFollowRequest userFollowRequest);

  ResponseEntity<Map<String, String>> unFollow(@RequestBody UserUnfollowRequest userUnfollowRequest);

  ResponseEntity<Map<String, String>> notification(@RequestBody UserNotificationRequest userNotificationRequest);
}