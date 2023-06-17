package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostRestController {
  private final PostService postService;


  /*Method returns  all posts from users that a user follows by his id
   * if userId is empty returns all posts descending by order based on created datetime*/
  @GetMapping(path = "/posts")
  public List<PostDtoResponse> getAllPostsFromFollowing(@RequestParam(name = "userId",
      defaultValue = "0") @Positive Integer userFollowingId, @RequestParam(name = "page", defaultValue = "0")
                                                        @Positive Integer page) {
    if (userFollowingId == 0) {
      return postService.getAllPosts(page);
    }
    return postService.getAllPostsFromToFollowWithNativeQuery(userFollowingId, page);
  }

  /*Method returns  all posts from users*/
  @GetMapping(path = "/posts/explorer")
  public List<PostDtoResponse> getAllPostsWithShowingRepostByUserId(@RequestParam(name = "userId",
      defaultValue = "0") @Positive Integer userId, @RequestParam(name = "page", defaultValue = "0")
                                                                    @Positive Integer page) {
    if (userId == 0) {
      return postService.getAllPosts(page);
    }
    return postService.getAllPostsWithShowingRepostByUserId(userId, page);
  }


  /*Method save a new post*/
  @PostMapping(path = "/posts")
  public ResponseEntity<PostDtoResponse> addPost(@Valid @RequestBody PostDtoSave thePostDtoSave) {
    Post dbPost = postService.savePost(thePostDtoSave);
    return new ResponseEntity<>(PostDtoResponse.from(dbPost), HttpStatus.CREATED);
  }

  /*Method returns all posts done by user*/
  @GetMapping(path = "/posts/{userId}")
  public List<PostDtoResponse> getAllOwnPosts(@PathVariable("userId") @Positive Integer userId,
                                              @RequestParam(name = "page", defaultValue = "0")
                                              @Positive Integer page) {

    return postService.getAllOwnPosts(userId, page);
  }


  /*Method returns all posts liked by user*/
  @GetMapping(path = "/posts/liked/{userId}")
  public List<PostDtoResponse> getAllLikedPosts(@PathVariable("userId") @Positive Integer userId,
                                                @RequestParam(name = "page", defaultValue = "0")
                                                @Positive Integer page) {
    return postService.getAllLikedPosts(userId, page);
  }

  /*Method returns all posts and reposts in descending order by time when
   they were posted (for own posts) and reposted (for reposts) by user*/
  @GetMapping("/posts/reposts")
  public List<PostDtoResponse> getAllPostsAndRepostsByUserId(@RequestParam(name = "userId", defaultValue = "0")
                                                             @Positive Integer userId,
                                                             @RequestParam(name = "page", defaultValue = "0")
                                                             @Positive Integer page) {
    if (userId == 0) {
      return new ArrayList<>();
    }
    return postService.getAllPostsAndRepostsByUserId(userId, page);

  }

  @GetMapping("/post/{postId}")
  public PostDtoResponse getPostByPostId(@PathVariable("postId") @Positive Integer postId,
                                         @Positive @RequestParam(name = "userId") Integer userId) {

    return postService.getPostByPostId(postId, userId);
  }

}
