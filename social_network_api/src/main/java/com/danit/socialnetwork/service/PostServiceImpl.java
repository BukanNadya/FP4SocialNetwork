package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.dto.post.PostRepostDtoMix;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.PostRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostLikeRepository postLikeRepository;

  private PostDtoResponse from(Post post) {
    PostDtoResponse postDtoResponse = PostDtoResponse.from(post);
    postDtoResponse.setLikesCount(postLikeRepository
        .findCountAllLikesByPostId(post.getPostId()));
    postDtoResponse.setPostCommentsCount(post.getPostComments().size());
    return postDtoResponse;
  }

  private PostRepostDtoMix from(Post post, Integer userId) {
    PostRepostDtoMix postRepostDtoMix = PostRepostDtoMix.from(post, userId);
    postRepostDtoMix.setLikesCount(postLikeRepository
        .findCountAllLikesByPostId(post.getPostId()));
    postRepostDtoMix.setPostCommentsCount(post.getPostComments().size());
    postRepostDtoMix.setIsRepost(!post.getUserPost().getUserId().equals(userId));
    return postRepostDtoMix;

  }

  // Method returns all available posts
  @Override
  public List<PostDtoResponse> getAllPosts(Integer pageNumber) {
    int pageSize = 12;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAll(
         offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
        .toList();
  }

  /*Method returns  all posts from users that a user follows by his id*/
  @Override
  public List<PostDtoResponse> getAllPostsFromToFollowWithNativeQuery(
      Integer userFollowerId, Integer pageNumber) {
    int pageSize = 12;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAllPostsFromToFollowOneRequest(
        userFollowerId, offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
        .toList();
  }

  // Method save the post and returns it
  @Override
  public Post savePost(PostDtoSave thePostDtoSave) {
    Optional<DbUser> userPost = userRepository.findById(thePostDtoSave.getUserId());
    DbUser user = null;
    if (userPost.isPresent()) {
      user = userPost.get();
    } else {
      throw new UserNotFoundException(String.format("User with userId %s not found",
          thePostDtoSave.getUserId()));
    }
    Post thePostSave = Post.from(thePostDtoSave, user);
    return postRepository.save(thePostSave);

  }

  /*Method returns all posts done by user*/
  @Override
  public List<PostDtoResponse> getAllOwnPosts(Integer userId, Integer page) {
    int pageSize = 10;
    Pageable pagedByTenPosts = PageRequest.of(page, pageSize);
    List<Post> listPost = postRepository.findAllByUserId(userId, pagedByTenPosts);
    return listPost.stream()
        .map(this::from)
        .toList();
  }

  /*Method returns all posts liked by user*/
  @Override
  public List<PostDtoResponse> getAllLikedPosts(Integer userId, Integer page) {
    int pageSize = 10;
    Pageable pagedByTenPosts = PageRequest.of(page, pageSize);
    List<Post> postList = postRepository.findAllByUserIdLiked(userId, pagedByTenPosts);
    return postList.stream()
        .map(this::from)
        .toList();
  }

  /*Method returns all posts and reposts in descending order by time when
   they were posted (for own posts) and reposted (for reposts) by user*/
  @Override
  public List<PostRepostDtoMix> getAllPostsAndRepostsByUserId(Integer userId, Integer page) {
    int pageSize = 10;
    Pageable pagedByTenPosts = PageRequest.of(page, pageSize);
    List<Post> postList = postRepository.findAllPostsAndRepostsByUserIdAsPost(userId, pagedByTenPosts);
    return postList.stream()
        .map(post -> from(post, userId))
        .toList();
  }

  @Override
  public List<PostDtoResponse> getAllPostsWithShowingRepostByUserId(Integer userId, Integer pageNumber) {
    int pageSize = 12;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAllPostsWithShowingRepostsByUserId(
        userId, offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
        .toList();
  }

}



