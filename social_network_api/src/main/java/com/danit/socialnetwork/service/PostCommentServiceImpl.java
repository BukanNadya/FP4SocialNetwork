package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostCommentDtoSave;
import com.danit.socialnetwork.exception.post.PostNotFoundException;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.repository.PostCommentRepository;
import com.danit.socialnetwork.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostCommentServiceImpl implements PostCommentService {

  private final PostCommentRepository postCommentRepository;
  private final PostRepository postRepository;
  private final ModelMapper modelMapper;

  @Override
  public PostComment savePostComment(PostCommentDtoSave postCommentDtoSave) {
    Integer postId = postCommentDtoSave.getPostId();
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isEmpty()) {
      throw new PostNotFoundException(String.format("Post with postId %s not found",
          postId));
    }
    Post tempPost = optionalPost.get();
    PostComment postComment = modelMapper.map(postCommentDtoSave, PostComment.class);
    postComment.setCreatedDateTime(LocalDateTime.now());
    postComment.setPostCommentId(0);
    tempPost.getPostComments().add(postComment);
    tempPost = postRepository.save(tempPost);
    return tempPost.getPostComments().get(tempPost.getPostComments().size() - 1);
  }


  @Override
  public List<PostComment> getAllPostCommentsByPostId(Integer postId, Integer page) {
    Pageable pagedByTenPosts =
        PageRequest.of(page, 10);
    return postCommentRepository.findAllCommentsByPostId(postId, pagedByTenPosts);
  }
}
