package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.UserFollower;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserFollowServiceImpl implements UserFollowService {

  private final UserFollowRepository userFollowRepository;
  private final UserRepository userRepository;

  @Override
  public List<UserFollower> getAllUserByUserFollowerIdAndReceivedNotificationPost(Integer userFollowerId) {
    return userFollowRepository
        .findAllByUserFollowerIdAndReceivedNotificationPostContaining(
            userFollowerId, true);
  }

  @Override
  public List<UserFollower> getAllUserByUserFollowerId(Integer userFollowerId) {
    return userFollowRepository
        .findAllByUserFollowerId(userRepository.findById(userFollowerId));
  }

  @Override
  public List<UserFollower> getAllUserByUserFollowingId(Integer userFollowingId) {
    return userFollowRepository
        .findAllByUserFollowingId(userRepository.findById(userFollowingId));
  }


}
