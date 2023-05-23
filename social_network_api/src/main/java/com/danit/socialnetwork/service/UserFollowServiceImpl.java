package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.UserFollow;
import com.danit.socialnetwork.repository.UserFollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserFollowServiceImpl implements UserFollowService {

  private final UserFollowRepository userFollowRepository;

  @Override
  public List<UserFollow> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId, boolean notify) {
    return userFollowRepository
        .findAllByUserFollowerIdAndReceivedNotificationPostContaining(
            userFollowerId, notify);
  }

  @Override
  public List<UserFollow> getAllUserByUserFollowerId(Integer userFollowerId) {
    return userFollowRepository
        .findAllByUserFollowerId(userFollowerId);
  }

  @Override
  public List<UserFollow> getAllUserByUserFollowingId(Integer userFollowingId) {
    return userFollowRepository
        .findAllByUserFollowingId(userFollowingId);
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
}
