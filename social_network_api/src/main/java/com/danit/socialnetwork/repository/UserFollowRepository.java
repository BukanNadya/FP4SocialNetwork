package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.UserFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserFollowRepository extends JpaRepository<UserFollower, Integer> {

  List<UserFollower> findAllByUserFollowerIdAndReceivedNotificationPostContaining(
      Integer userFollowerId, Boolean receivedNotificationPost
  );

  List<UserFollower> findAllByUserFollowerId(Optional<DbUser> user);

  List<UserFollower> findAllByUserFollowingId(Optional<DbUser> user);

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM USER_FOLLOWS UF "
      + "WHERE UF.USER_FOLLOWING_ID= :followingId")
  Integer findAllFollowers(Integer followingId);


  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM USER_FOLLOWS UF "
      + "WHERE UF.USER_FOLLOWER_ID= :followerId")
  Integer findAllFollowings(Integer followerId);


}
