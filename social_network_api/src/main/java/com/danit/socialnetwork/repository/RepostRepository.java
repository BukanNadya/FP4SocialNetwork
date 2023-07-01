package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Repost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepostRepository extends JpaRepository<Repost, Integer> {
  @Query(nativeQuery = true, value = "SELECT * FROM REPOSTS WHERE REPOSTS.USER_ID = :userId "
      + "ORDER BY REPOSTS.REPOSTED_DATETIME DESC")
  List<Repost> findAllByUserId(Integer userId, Pageable pagedByTenPosts);

  @Query(nativeQuery = true, value = "SELECT * FROM REPOSTS"
      + " WHERE REPOSTS.POST_ID = :postId AND REPOSTS.USER_ID = :userId")
  Optional<Repost> findRepostByPostIdAndUserId(Integer postId, Integer userId);

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM REPOSTS R "
      + "WHERE R.POST_ID= :postId")
  Integer findCountAllRepostsByPostId(Integer postId);

  @Query(nativeQuery = true, value = "SELECT * FROM REPOSTS "
      + "WHERE POST_ID= :postId")
  List<Repost> findAllByPostId(Integer postId);

}
