package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.ImageHandlingConf;
import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.exception.post.PostCommentNotFoundException;
import com.danit.socialnetwork.exception.post.PostLikeNotFoundException;
import com.danit.socialnetwork.exception.post.PostNotFoundException;
import com.danit.socialnetwork.exception.post.RepostNotFoundException;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.repository.PostCommentRepository;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.PostRepository;
import com.danit.socialnetwork.repository.RepostRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.Cache;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostServiceImpl implements PostService {
  private final PostCommentRepository postCommentRepository;

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostLikeRepository postLikeRepository;
  private final RepostRepository repostRepository;
  private final ImageHandlingConf imageHandlingConf;

  // Map to store accumulated view counts
  private Map<Integer, Integer> accumulatedViewCounts = new HashMap<>();

  private PostDtoResponse from(Post post, Integer userId) {
    PostDtoResponse postDtoResponse = PostDtoResponse.from(post, userId);
    postDtoResponse.setLikesCount(postLikeRepository
        .findCountAllLikesByPostId(post.getPostId()));
    postDtoResponse.setIsReposted((repostRepository.findRepostByPostIdAndUserId(
        post.getPostId(), userId)).isPresent());
    postDtoResponse.setRepostsCount(repostRepository.findCountAllRepostsByPostId(
        post.getPostId()));
    return postDtoResponse;
  }

  // Method returns all available posts
  @Override
  public List<PostDtoResponse> getAllPosts(Integer pageNumber) {
    int pageSize = 100;
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
    if (userPost.isEmpty()) {
      throw new UserNotFoundException(String.format("User with userId %s not found",
          thePostDtoSave.getUserId()));
    } else {
      DbUser user = userPost.get();
      byte[] photoFileByteArray = thePostDtoSave.getPhotoFileByteArray();
      if (photoFileByteArray != null && photoFileByteArray.length != 0) {
        return postRepository.save(Post.from(thePostDtoSave, user,
            imageHandlingConf.uploadImage(photoFileByteArray,
                "production", 800, 500)));
      }
      return postRepository.save(Post.from(thePostDtoSave, user, null));
    }
  }

  /*Method returns all posts done by user*/
  @Override
  public List<PostDtoResponse> getAllOwnPosts(Integer userId, Integer pageNumber) {
    int pageSize = 100;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAllByUserIdOneQuery(
        userId, offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
        .toList();
  }

  /*Method returns all posts liked by user*/
  @Override
  public List<PostDtoResponse> getAllLikedPosts(Integer userId, Integer pageNumber) {
    int pageSize = 100;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAllByUserIdLikedOneQuery(
        userId, offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
        .toList();
  }

  /*Method returns all posts and reposts in descending order by time when
   they were posted (for own posts) and reposted (for reposts) by user*/
  @Override
  public List<PostDtoResponse> getAllPostsAndRepostsByUserId(Integer userId, Integer pageNumber) {
    int pageSize = 100;
    int offset = pageNumber * pageSize;
    List<Object[]> results = postRepository.findAllPostsAndRepostsByUserIdAsPostOneQuery(
        userId, offset, pageSize);
    return results.stream()
        .map(PostDtoResponse::mapToPostDtoResponse)
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

  @Override
  public PostDtoResponse getPostByPostId(Integer postId, Integer userId) {
    Optional<Post> tempPost = postRepository.findById(postId);
    if (tempPost.isPresent()) {
      return from(tempPost.get(), userId);
    } else {
      throw new PostNotFoundException(String.format("Post with postId %s not found",
          postId));
    }
  }

  @Override
  public Integer findLatestPostIdByUserId(Integer userId) {
    return postRepository.findLatestPostByUserId(userId).getPostId();
  }

  /*Method to add views for received an array of postIds*/
  @Override
  public HttpStatus addViews(Integer[] postIdArray) {
    Arrays.stream(postIdArray).forEach(this::incrementViewCount);
    return HttpStatus.OK;
  }


  /*Method to increment the view count for a post by postId and
   call method performBatchUpdate with defined threshold * */
  public Integer incrementViewCount(Integer postId) {
    accumulatedViewCounts.putIfAbsent(postId, 0);
    int viewCount = accumulatedViewCounts.get(postId) + 1;
    accumulatedViewCounts.put(postId, viewCount);
    if (viewCount % 20 == 0) {
      performBatchUpdate(postId);
    }
    return viewCount;
  }

  // Method to perform update view count for a post by postId
  private Integer performBatchUpdate(Integer postId) {
    Integer viewCount = accumulatedViewCounts.get(postId);
    Post post = postRepository.findById(postId).orElse(null);
    if (post != null) {
      post.setViewCount(post.getViewCount() + viewCount);
      postRepository.save(post);
    }
    accumulatedViewCounts.remove(postId);
    return post.getViewCount();
  }

  /*Method to add view counts to all posts scheduled by time*/
  @Scheduled(fixedRate = 300000)
  private void performBatchUpdateByTime() {
    List<Post> updatedPosts = new ArrayList<>();
    for (Map.Entry<Integer, Integer> entry : accumulatedViewCounts.entrySet()) {
      Integer postId = entry.getKey();
      Integer viewCount = entry.getValue();
      Optional<Post> optionalPost = postRepository.findById(postId);
      optionalPost.ifPresent(post -> {
        Integer startCount = post.getViewCount() != null ? post.getViewCount() : 0;
        post.setViewCount(startCount + viewCount);
        updatedPosts.add(post);
      });
    }
    postRepository.saveAll(updatedPosts);
    accumulatedViewCounts.clear();
  }

  @Override
  public Post findPostByPostId(Integer postId) {
    return postRepository.findPostByPostId(postId);
  }

  @Override
  public Post deletePost(Integer postId) {

    List<Repost> repostList = repostRepository.findAllByPostId(postId);
    for (Repost repost :
        repostList) {
      if (repost == null) {
        throw new RepostNotFoundException(String.format("PostLike with postId %s not found",
            postId));
      }
      repostRepository.delete(repost);
    }

    List<PostLike> likeList = postLikeRepository.findAllByPostId(postId);
    for (PostLike postLike :
        likeList) {
      if (postLike == null) {
        throw new PostLikeNotFoundException(String.format("PostLike with postId %s not found",
            postId));
      }
      postLikeRepository.delete(postLike);
    }

    List<PostComment> postCommentList = postCommentRepository.findAllCommentsByPostId(postId);
    for (PostComment postComment :
        postCommentList) {
      if (postComment == null) {
        throw new PostCommentNotFoundException(String.format("PostComment with postId %s not found",
            postId));
      }
      postCommentRepository.delete(postComment);
    }
    Post post = postRepository.findById(postId).orElse(null);
    postRepository.deleteById(postId);
    return post;
  }

}



