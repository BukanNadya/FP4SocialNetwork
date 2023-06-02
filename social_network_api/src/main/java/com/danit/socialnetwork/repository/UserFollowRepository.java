package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserFollowRepository extends JpaRepository<UserFollow, Integer> {

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM USER_FOLLOWS UF "
      + "WHERE UF.USER_FOLLOWING_ID= :followingId")
  Integer findAllFollowers(Integer followingId);


  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM USER_FOLLOWS UF "
      + "WHERE UF.USER_FOLLOWER_ID= :followerId")
  Integer findAllFollowings(Integer followerId);

  @Query(nativeQuery = true, value = "select * from user_follows "
      + "where user_follower_id = :userFollowerId ")
  List<UserFollow> findAllByUserFollowerId(Integer userFollowerId);

  @Query(nativeQuery = true, value = "select * from user_follows "
      + "where user_following_id = :userFollowingId ")
  List<UserFollow> findAllByUserFollowingId(Integer userFollowingId);

  @Query(nativeQuery = true, value = "select * from user_follows "
      + "where user_follower_id = :userFollowerId "
      + "and user_following_id = :userFollowingId")
  Optional<UserFollow> findUserFollowByUserFollowerIdAndUserFollowingId(
      Integer userFollowerId, Integer userFollowingId);

  @Query(nativeQuery = true, value = "select * from user_follows "
      + "where user_follower_id = :userFollowerId "
      + "and received_notification_post = :receivedNotificationPost")
  List<UserFollow> findAllByUserFollowerIdAndReceivedNotificationPostContaining(
      Integer userFollowerId, Boolean receivedNotificationPost);
}
