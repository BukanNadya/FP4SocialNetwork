package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

  @Query(nativeQuery = true, value = "SELECT * FROM POSTS "
      + "LEFT JOIN USER_FOLLOWS ON POSTS.USER_ID = USER_FOLLOWS.USER_FOLLOWING_ID "
      + "WHERE USER_FOLLOWS.USER_FOLLOWER_ID = :userId "
      + "ORDER BY POSTS.SENT_DATETIME DESC")
  List<Post> findAllPostsFromToFollow(Integer userId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT DISTINCT POSTS.P_ID, POSTS.PHOTO_FILE, POSTS.SENT_DATETIME, "
      + "POSTS.WRITTEN_TEXT, POSTS.USER_ID, "
      + "USERS.USERNAME, USERS.NAME, USERS.PROFILE_IMAGE_URL, "
      + "(SELECT COUNT(*) FROM POST_LIKES WHERE POST_LIKES.POST_ID = POSTS.P_ID) AS likesCount, "
      + "(SELECT COUNT(*) FROM POST_COMMENTS WHERE POST_COMMENTS.POST_ID = POSTS.P_ID) AS commentsCount, "
      + "(SELECT COUNT(*) FROM REPOSTS WHERE REPOSTS.POST_ID = POSTS.P_ID) AS repostsCount, "
      + "(CASE "
      + "WHEN EXISTS (SELECT 1 FROM REPOSTS WHERE REPOSTS.USER_ID = :userId AND REPOSTS.POST_ID = POSTS.P_ID) "
      + "THEN 'true' "
      + "ELSE 'false' "
      + "END) AS repostExists "
      + "FROM POSTS "
      + "LEFT JOIN USER_FOLLOWS ON POSTS.USER_ID = USER_FOLLOWS.USER_FOLLOWING_ID "
      + "INNER JOIN USERS ON POSTS.USER_ID = USERS.USER_ID "
      + "WHERE USER_FOLLOWS.USER_FOLLOWER_ID = :userId "
      + "ORDER BY POSTS.SENT_DATETIME DESC "
      + "OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY;")
  List<Object[]> findAllPostsFromToFollowOneRequest(Integer userId, @Param("offset") int offset,
                                                    @Param("pageSize") int pageSize);


  @Query(nativeQuery = true, value = "SELECT DISTINCT POSTS.P_ID, POSTS.PHOTO_FILE, POSTS.SENT_DATETIME, "
      + "POSTS.WRITTEN_TEXT, POSTS.USER_ID, "
      + "USERS.USERNAME, USERS.NAME, USERS.PROFILE_IMAGE_URL, "
      + "(SELECT COUNT(*) FROM POST_LIKES WHERE POST_LIKES.POST_ID = POSTS.P_ID) AS likesCount, "
      + "(SELECT COUNT(*) FROM POST_COMMENTS WHERE POST_COMMENTS.POST_ID = POSTS.P_ID) AS commentsCount, "
      + "(SELECT COUNT(*) FROM REPOSTS WHERE REPOSTS.POST_ID = POSTS.P_ID) AS repostsCount "
      + "FROM POSTS "
      + "INNER JOIN USERS ON POSTS.USER_ID = USERS.USER_ID "
      + "ORDER BY POSTS.SENT_DATETIME DESC "
      + "OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY;")
  List<Object[]> findAll(@Param("offset") int offset,
                         @Param("pageSize") int pageSize);


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


  @Query(nativeQuery = true, value = "SELECT DISTINCT POSTS.P_ID, POSTS.PHOTO_FILE, POSTS.SENT_DATETIME, "
      + "POSTS.WRITTEN_TEXT, POSTS.USER_ID, "
      + "USERS.USERNAME, USERS.NAME, USERS.PROFILE_IMAGE_URL, "
      + "(SELECT COUNT(*) FROM POST_LIKES WHERE POST_LIKES.POST_ID = POSTS.P_ID) AS likesCount, "
      + "(SELECT COUNT(*) FROM POST_COMMENTS WHERE POST_COMMENTS.POST_ID = POSTS.P_ID) AS commentsCount, "
      + "(SELECT COUNT(*) FROM REPOSTS WHERE REPOSTS.POST_ID = POSTS.P_ID) AS repostsCount, "
      + "(CASE "
      + "WHEN EXISTS (SELECT 1 FROM REPOSTS R WHERE R.USER_ID = :userId AND R.POST_ID = POSTS.P_ID) "
      + "THEN 'true' "
      + "ELSE 'false' "
      + "END) AS repostExists "
      + "FROM POSTS "
      + "INNER JOIN USERS ON POSTS.USER_ID = USERS.USER_ID "
      + "ORDER BY POSTS.SENT_DATETIME DESC "
      + "OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY;")
  List<Object[]> findAllPostsWithShowingRepostsByUserId(Integer userId, @Param("offset") int offset,
                                                        @Param("pageSize") int pageSize);


  @Query(nativeQuery = true, value = "SELECT * "
      + "FROM posts WHERE user_id = :userId "
      + "ORDER BY sent_datetime DESC LIMIT 1")
  Post findLatestPostByUserId(Integer userId);

  Post findPostByPostId(Integer postId);
}
