package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<DbUser, Integer> {
  Optional<DbUser> findByUsername(String username);

  Optional<DbUser> findById(Integer userId);

  Optional<DbUser> findDbUserByEmail(String email);

  @Query(nativeQuery = true, value = "SELECT * FROM USERS"
      + " LEFT JOIN POST_LIKES PL on USERS.USER_ID = PL.USER_ID"
      + " WHERE PL.POST_ID = :postId"
      + " ORDER BY USERS.NAME")
  List<DbUser> getUsersWhoLikedPostByPostId(Integer postId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT USERS.*, COUNT(USER_FOLLOWER_ID) AS num_followers"
      + " FROM USERS"
      + " JOIN USER_FOLLOWS f ON USERS.user_id = f.USER_FOLLOWING_ID"
      + " GROUP BY USERS.user_id"
      + " ORDER BY num_followers DESC")
  List<DbUser> findAllWhoMostPopular(Pageable pagedByPageSizePosts);
}
