package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.UserFollower;
import com.danit.socialnetwork.repository.PostRepository;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final UserFollowRepository userFollowRepository;
  private final UserRepository userRepository;


  // Method returns all available posts
  @Override
  public List<PostDtoResponse> getAllPosts(Integer page) {
    Pageable sortedByDateTimeDesc =
        PageRequest.of(page, 12, Sort.by("sentDateTime").descending());
    Page<Post> listPost = postRepository.findAll(sortedByDateTimeDesc);
    List<PostDtoResponse> postDtoResponseList = listPost.stream()
        .map(PostDtoResponse::from)
        .toList();
    return postDtoResponseList;
  }

  // Method returns  all posts from users that a user follows by his id
  @Override
  public List<PostDtoResponse> getAllPostsFromToFollowWithNativeQuery(
      Integer userFollowerId, Integer page) {
    Pageable pagedByTenPosts =
        PageRequest.of(page, 12);
    List<Post> postList = postRepository.findAllPostsFromToFollow(
        userFollowerId, pagedByTenPosts);
    return postList.stream()
        .map(PostDtoResponse::from)
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

}
