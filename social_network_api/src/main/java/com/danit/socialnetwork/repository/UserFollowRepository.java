package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.UserFollower;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserFollowRepository extends JpaRepository<UserFollower, Integer> {

  List<UserFollower> findAllByUserFollowerIdAndReceivedNotificationPostContaining(
      Integer userFollowerId, Boolean receivedNotificationPost
  );

  List<UserFollower> findAllByUserFollowerId(Optional<DbUser> user);


}
