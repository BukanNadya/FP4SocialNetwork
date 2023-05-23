package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.UserNotificationRequest;
import com.danit.socialnetwork.dto.UserUnfollowRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.UserFollow;
import com.danit.socialnetwork.repository.UserRepository;
import com.danit.socialnetwork.service.UserFollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class UserFollowRestController {

  private final UserFollowService userFollowService;
  private final UserRepository userRepository;

  @GetMapping("/following/{userID}")
  @ResponseBody
  public List<UserFollow> getAllFollowings(@PathVariable("userID") Integer userId) {
    return userFollowService.getAllUserByUserFollowerId(userId);
  }

  @GetMapping("/followers/{userID}")
  @ResponseBody
  public List<UserFollow> getAllFollowers(@PathVariable("userID") Integer userId) {
    return userFollowService.getAllUserByUserFollowingId(userId);
  }

  @PostMapping("api/follow")
  public ResponseEntity<?> follow(@RequestBody UserFollowRequest userFollowRequest) {
    Optional<DbUser> maybeFollower = userRepository.findById(userFollowRequest.getUserFollower());
    Optional<DbUser> maybeFollowing = userRepository.findById(userFollowRequest.getUserFollowing());
    Map<String, String> response = new HashMap<>();
    if (maybeFollower.isPresent()
        && maybeFollowing.isPresent()
        && !maybeFollower.equals(maybeFollowing)) {
      DbUser follower = maybeFollower.get();
      DbUser following = maybeFollowing.get();
      Optional<UserFollow> maybeUserFollow = userFollowService
          .getUserFollowByUserFollowerIdAndUserFollowingId(follower.getUserId(), following.getUserId());

      if (maybeUserFollow.isPresent()) {
        response.put("message", "Following already exists");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
      }
      UserFollow newEntry;
      newEntry = new UserFollow();
      newEntry.setUserFollowerId(follower);
      newEntry.setUserFollowingId(following);
      newEntry.setReceivedNotificationPost(true);
      response.put("message", userFollowService.saveUserFollower(newEntry));
      return ResponseEntity.ok(response);
    }
    response.put("message", "invalid user id");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("api/unfollow")
  public ResponseEntity<?> follow(@RequestBody UserUnfollowRequest userUnfollowRequest) {
    Integer unfollowed = userUnfollowRequest.getUserUnfollowed();
    Integer unfollowing = userUnfollowRequest.getUserUnfollowing();

    Optional<UserFollow> deletedUserFollow = userFollowService
        .getUserFollowByUserFollowerIdAndUserFollowingId(unfollowed, unfollowing);

    Map<String, String> response = new HashMap<>();

    if (deletedUserFollow.isPresent()) {

      response.put("message", userFollowService
          .deleteUserFollowByUserFollowId(deletedUserFollow.get()
              .getUserFollowId()));
      return ResponseEntity.ok(response);
    }
    response.put("message", "invalid user id");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("api/notification")
  public ResponseEntity<?> follow(@RequestBody UserNotificationRequest userNotificationRequest) {
    Optional<DbUser> maybeFollower = userRepository.findById(userNotificationRequest.getUserFollower());
    Optional<DbUser> maybeFollowing = userRepository.findById(userNotificationRequest.getUserFollowing());

    Boolean receivedNotificationPost = userNotificationRequest.getReceiveNotifications();

    Map<String, String> response = new HashMap<>();

    if (maybeFollower.isEmpty()
        || maybeFollowing.isEmpty()
        || maybeFollower.equals(maybeFollowing)) {
      response.put("message", "invalid user id");
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    DbUser follower = userRepository.findById(userNotificationRequest.getUserFollower()).get();
    DbUser following = userRepository.findById(userNotificationRequest.getUserFollowing()).get();

    Optional<UserFollow> MaybeUser = userFollowService
        .getUserFollowByUserFollowerIdAndUserFollowingId(follower.getUserId(), following.getUserId());

    UserFollow newEntry;
    if (MaybeUser.isPresent()) {
      newEntry = MaybeUser.get();
      newEntry.setReceivedNotificationPost(receivedNotificationPost);
    } else {
      newEntry = new UserFollow();
      newEntry.setUserFollowerId(follower);
      newEntry.setUserFollowingId(following);
      newEntry.setReceivedNotificationPost(true);
    }
    response.put("message", userFollowService.saveUserFollower(newEntry));
    return ResponseEntity.ok(response);
  }
}
