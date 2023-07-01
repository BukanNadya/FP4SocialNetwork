package com.danit.socialnetwork.repository;


import com.danit.socialnetwork.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {

  @Query(nativeQuery = true, value = "SELECT * FROM POST_LIKES WHERE POST_LIKES.POST_ID = :postId")
  List<PostLike> findAllPostLikesByPostId(Integer postId);

  @Query(nativeQuery = true, value = "SELECT * FROM POST_LIKES"
      + " WHERE POST_LIKES.POST_ID = :postId AND POST_LIKES.USER_ID = :userId")
  Optional<PostLike> findPostLikeByPostIdAndUserId(Integer postId, Integer userId);

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM POST_LIKES PL "
      + "WHERE PL.POST_ID= :postId")
  Integer findCountAllLikesByPostId(Integer postId);

  @Query(nativeQuery = true, value = "SELECT * FROM POST_LIKES "
      + "WHERE POST_ID= :postId")
  List<PostLike> findAllByPostId(Integer postId);


}
