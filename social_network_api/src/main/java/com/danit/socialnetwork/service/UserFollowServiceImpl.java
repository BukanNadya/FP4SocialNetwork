package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.UserNotificationRequest;
import com.danit.socialnetwork.dto.UserUnfollowRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.UserFollow;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserFollowServiceImpl implements UserFollowService {

  private final UserFollowRepository userFollowRepository;
  private final UserRepository userRepository;
  String message = "message";
  String invalidId = "invalid user id";

  @Override
  public List<UserFollow> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId, boolean notify) {
    return userFollowRepository
        .findAllByUserFollowerIdAndReceivedNotificationPostContaining(
            userFollowerId, notify);
  }

  @Override
  public List<UserFollowDtoResponse> getAllUsersByUserFollowerId(Integer userFollowerId) {
    return userFollowRepository
        .findAllByUserFollowerId(userFollowerId)
        .stream()
        .map(UserFollowDtoResponse::fromUserFollowing)
        .toList();
  }

  @Override
  public List<UserFollowDtoResponse> getAllUsersByUserFollowingId(Integer userFollowingId) {
    return userFollowRepository
        .findAllByUserFollowingId(userFollowingId)
        .stream()
        .map(UserFollowDtoResponse::fromUserFollower)
        .toList();
  }

  @Override
  public String saveUserFollower(UserFollow userFollow) {
    userFollowRepository.save(userFollow);
    return "changes saved";
  }

  @Override
  public Optional<UserFollow> getUserFollowByUserFollowerIdAndUserFollowingId(Integer userFollower, Integer userFollowing) {
    return userFollowRepository.findUserFollowByUserFollowerIdAndUserFollowingId(userFollower, userFollowing);
  }

  @Override
  public String deleteUserFollowByUserFollowId(Integer userFollowId) {
    userFollowRepository.deleteById(userFollowId);
    return "user follow deleted";
  }

  @Override
  public ResponseEntity<Map<String, String>> isFollowing(@RequestBody UserFollowRequest userFollowRequest) {
    Optional<UserFollow> maybeUser = getUserFollowByUserFollowerIdAndUserFollowingId(
        userFollowRequest.getUserFollower(), userFollowRequest.getUserFollowing());

    Map<String, String> response = new HashMap<>();
    if (maybeUser.isPresent()) {
      response.put("following", "true");
      return new ResponseEntity<>(response, HttpStatus.OK);
    }
    response.put("following", "false");
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Map<String, String>> follow(@RequestBody UserFollowRequest userFollowRequest) {
    Optional<DbUser> maybeFollower = userRepository.findById(userFollowRequest.getUserFollower());
    Optional<DbUser> maybeFollowing = userRepository.findById(userFollowRequest.getUserFollowing());
    Map<String, String> response = new HashMap<>();
    if (maybeFollower.isPresent()
        && maybeFollowing.isPresent()
        && !maybeFollower.equals(maybeFollowing)) {
      DbUser follower = maybeFollower.get();
      DbUser following = maybeFollowing.get();
      Optional<UserFollow> maybeUserFollow = getUserFollowByUserFollowerIdAndUserFollowingId(
          follower.getUserId(), following.getUserId());

      if (maybeUserFollow.isPresent()) {
        response.put(message, "Following already exists");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
      }
      UserFollow newEntry;
      newEntry = new UserFollow();
      newEntry.setUserFollowerId(follower);
      newEntry.setUserFollowingId(following);
      newEntry.setReceivedNotificationPost(true);
      response.put(message, saveUserFollower(newEntry));
      return ResponseEntity.ok(response);
    }
    response.put(message, invalidId);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  public ResponseEntity<Map<String, String>> unFollow(@RequestBody UserUnfollowRequest userUnfollowRequest) {
    Integer unfollowed = userUnfollowRequest.getUserUnfollowed();
    Integer unfollowing = userUnfollowRequest.getUserUnfollowing();

    Optional<UserFollow> deletedUserFollow = getUserFollowByUserFollowerIdAndUserFollowingId(unfollowed, unfollowing);

    Map<String, String> response = new HashMap<>();

    if (deletedUserFollow.isPresent()) {

      response.put(message, deleteUserFollowByUserFollowId(deletedUserFollow.get()
          .getUserFollowId()));
      return ResponseEntity.ok(response);
    }
    response.put(message, invalidId);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  public ResponseEntity<Map<String, String>> notification(@RequestBody UserNotificationRequest userNotificationRequest) {
    Optional<DbUser> maybeFollower = userRepository.findById(userNotificationRequest.getUserFollower());
    Optional<DbUser> maybeFollowing = userRepository.findById(userNotificationRequest.getUserFollowing());

    Boolean receivedNotificationPost = userNotificationRequest.getReceiveNotifications();

    Map<String, String> response = new HashMap<>();

    if (maybeFollower.isEmpty()
        || maybeFollowing.isEmpty()
        || maybeFollower.equals(maybeFollowing)) {
      response.put(message, invalidId);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    DbUser follower = userRepository.findById(userNotificationRequest.getUserFollower()).get();
    DbUser following = userRepository.findById(userNotificationRequest.getUserFollowing()).get();

    Optional<UserFollow> maybeUser = getUserFollowByUserFollowerIdAndUserFollowingId(
        follower.getUserId(), following.getUserId());

    UserFollow newEntry;
    if (maybeUser.isPresent()) {
      newEntry = maybeUser.get();
      newEntry.setReceivedNotificationPost(receivedNotificationPost);
    } else {
      newEntry = new UserFollow();
      newEntry.setUserFollowerId(follower);
      newEntry.setUserFollowingId(following);
      newEntry.setReceivedNotificationPost(true);
    }
    response.put(message, saveUserFollower(newEntry));
    return ResponseEntity.ok(response);
  }
}
