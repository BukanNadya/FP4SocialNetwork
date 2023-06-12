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

  @Query(nativeQuery = true, value = "SELECT "
      + " USERS.USER_ID, USERS.NAME,"
      + " USERS.USERNAME, USERS.PROFILE_IMAGE_URL,"
      + " CASE"
      + " WHEN EXISTS (SELECT 1 FROM USER_FOLLOWS WHERE USER_FOLLOWS.USER_FOLLOWER_ID = :userId"
      + " AND USER_FOLLOWS.USER_FOLLOWING_ID = USERS.USER_ID)"
      + " THEN 'true'"
      + " ELSE 'false'"
      + " END AS isFollowed,"
      + " COUNT(DISTINCT USER_FOLLOWS.USER_FOLLOWER_ID) AS num_followers"
      + " FROM USERS LEFT JOIN USER_FOLLOWS ON USERS.USER_ID = USER_FOLLOWS.USER_FOLLOWING_ID"
      + " GROUP BY USERS.USER_ID"
      + " ORDER BY num_followers DESC"
      + " OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY;")
  List<Object[]> findAllWhoMostPopularWithFollowers(Integer userId, Integer offset, Integer pageSize);


}
