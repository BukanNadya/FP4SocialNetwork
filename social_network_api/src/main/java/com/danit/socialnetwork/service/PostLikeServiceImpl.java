package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.exception.post.PostLikeNotFoundException;
import com.danit.socialnetwork.exception.post.PostNotFoundException;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostLikeServiceImpl implements PostLikeService {

  private final PostLikeRepository postLikeRepository;
  private final PostRepository postRepository;
  private final ModelMapper modelMapper;


  @Override
  public PostLike savePostLike(PostLikeDto postLikeDto) {
    Optional<PostLike> tempPostLike = postLikeRepository.findPostLikeByPostIdAndUserId(
        postLikeDto.getPostId(), postLikeDto.getUserId()
    );
    if (tempPostLike.isPresent()) {
      return tempPostLike.get();
    }
    Optional<Post> optionalPost = postRepository.findById(postLikeDto.getPostId());
    if (optionalPost.isEmpty()) {
      throw new PostNotFoundException(String.format("Post with postId %s not found",
          postLikeDto.getPostId()));
    }
    Post tempPost = optionalPost.get();
    PostLike postLike = modelMapper.map(postLikeDto, PostLike.class);
    postLike.setPostLikeId(0);
    postLike.setCreatedDateTime(LocalDateTime.now());
    tempPost.getPostLikes().add(postLike);
    postRepository.save(tempPost);
    return tempPost.getPostLikes().get(tempPost.getPostLikes().size() - 1);
  }

  @Override
  public List<PostLike> getAllPostLikesByPostId(Integer postId) {

    return postLikeRepository.findAllPostLikesByPostId(postId);
  }

  @Override
  public Boolean isPresentPostLike(Integer postId, Integer userId) {
    Optional<PostLike> tempPostLike = postLikeRepository.findPostLikeByPostIdAndUserId(postId, userId);
    return tempPostLike.isPresent();
  }

  @Override
  public PostLike deletePostLike(Integer postId, Integer userId) {
    Optional<PostLike> tempPostLike = postLikeRepository.findPostLikeByPostIdAndUserId(
        postId, userId);
    if (tempPostLike.isEmpty()) {
      throw new PostLikeNotFoundException(String.format("PostLike with postId %s not found",
          postId));
    }
    postLikeRepository.delete(tempPostLike.get());
    return tempPostLike.get();
  }

  @Override
  public Integer getCountAllLikesByPostId(Integer postId) {
    return postLikeRepository.findCountAllLikesByPostId(postId);
  }
}
