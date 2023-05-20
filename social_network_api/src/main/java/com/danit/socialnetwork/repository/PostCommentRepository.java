package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.PostComment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Integer> {
  @Query(nativeQuery = true, value = "SELECT * FROM POST_COMMENTS WHERE POST_COMMENTS.POST_ID = :postId "
      + "order by POST_COMMENTS.CREATED_DATETIME DESC")
  List<PostComment> findAllCommentsByPostId(Integer postId, Pageable pageable);
}
