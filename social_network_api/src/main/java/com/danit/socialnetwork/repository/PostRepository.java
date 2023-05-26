package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

  @Query(nativeQuery = true, value = "SELECT * FROM POSTS "
      + "LEFT JOIN USER_FOLLOWS ON POSTS.USER_ID = USER_FOLLOWS.USER_FOLLOWING_ID "
      + "WHERE USER_FOLLOWS.USER_FOLLOWER_ID = :userId "
      + "ORDER BY POSTS.SENT_DATETIME DESC")
  List<Post> findAllPostsFromToFollow(Integer userId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM POSTS WHERE POSTS.USER_ID = :userId "
      + "ORDER BY POSTS.SENT_DATETIME DESC")
  List<Post> findAllByUserId(Integer userId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM POSTS LEFT JOIN POST_LIKES on "
      + "POSTS.P_ID = POST_LIKES.POST_ID WHERE POST_LIKES.USER_ID = :userId "
      + "ORDER BY POSTS.SENT_DATETIME DESC")
  List<Post> findAllByUserIdLiked(Integer userId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT DISTINCT POSTS.*, "
      + " CASE WHEN POSTS.USER_ID = :userId THEN POSTS.SENT_DATETIME"
      + " ELSE COALESCE(REPOSTED_DATETIME, SENT_DATETIME)"
      + " END AS JOINED_TIME"
      + " FROM POSTS LEFT JOIN "
      + " REPOSTS R on POSTS.P_ID = R.POST_ID WHERE R.USER_ID = :userId or  POSTS.USER_ID = :userId"
      + " ORDER BY JOINED_TIME DESC")
  List<Post> findAllPostsAndRepostsByUserIdAsPost(Integer userId, Pageable pagedByTenPosts);
}
