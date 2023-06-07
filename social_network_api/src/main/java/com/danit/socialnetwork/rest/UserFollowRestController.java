package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.UserNotificationRequest;
import com.danit.socialnetwork.dto.UserUnfollowRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.service.UserFollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
public class UserFollowRestController {

  private final UserFollowService userFollowService;

  @GetMapping("/api/following/{userID}")
  public ResponseEntity<List<UserFollowDtoResponse>> getAllFollowings(@PathVariable("userID") Integer userId) {
    return new ResponseEntity<>(userFollowService.getAllUsersByUserFollowerId(userId), HttpStatus.OK);
  }

  @GetMapping("/api/followers/{userID}")
  public ResponseEntity<List<UserFollowDtoResponse>> getAllFollowers(@PathVariable("userID") Integer userId) {
    return new ResponseEntity<>(userFollowService.getAllUsersByUserFollowingId(userId), HttpStatus.OK);
  }

  @PostMapping("api/isfollowing")
  public ResponseEntity<Map<String, String>> isFollowing(@RequestBody UserFollowRequest userFollowRequest) {
    ResponseEntity<Map<String, String>> responseEntity = userFollowService.isFollowing(userFollowRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("api/follow")
  public ResponseEntity<Map<String, String>> follow(@RequestBody UserFollowRequest userFollowRequest) {
    ResponseEntity<Map<String, String>> responseEntity = userFollowService.follow(userFollowRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("api/unfollow")
  public ResponseEntity<Map<String, String>> unFollow(@RequestBody UserUnfollowRequest userUnfollowRequest) {
    ResponseEntity<Map<String, String>> responseEntity = userFollowService.unFollow(userUnfollowRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("api/notification")
  public ResponseEntity<Map<String, String>> notification(@RequestBody UserNotificationRequest userNotificationRequest) {
    ResponseEntity<Map<String, String>> responseEntity = userFollowService.notification(userNotificationRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }
}