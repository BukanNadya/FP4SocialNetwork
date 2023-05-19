package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.exception.post.PostLikeNotFoundException;
import com.danit.socialnetwork.exception.post.PostNotFoundException;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.PostRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.metadata.Db2CallMetaDataProvider;
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
  @Autowired
  private ModelMapper modelMapper;

  @Override
  public PostLike savePostLike(PostLikeDto postLikeDto) {
    Optional<PostLike> tempPostLike = postLikeRepository.findPostLikeByPostIdAndUserId(
        postLikeDto.getPostId(), postLikeDto.getUserId()
    );
    if (tempPostLike.isPresent()) {
      return tempPostLike.get();
    }

    PostLike postLike = this.modelMapper.map(postLikeDto, PostLike.class);
    postLike.setPostLikeId(4);
    postLike.setCreatedDateTime(LocalDateTime.now());
    Optional<Post> tempPost = postRepository.findById(postLikeDto.getPostId());
    if (tempPost.isPresent()) {
      postLike.setPostInPostLike(tempPost.get());
    } else {
      throw new PostNotFoundException(String.format("Post with postId %s not found",
          postLikeDto.getPostId()));
    }
    return postLikeRepository.save(postLike);
  }

  @Override
  public List<PostLike> getAllPostLikesByPostId(Integer postId) {
    return postLikeRepository.findAllByPostId(postId);
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
}
