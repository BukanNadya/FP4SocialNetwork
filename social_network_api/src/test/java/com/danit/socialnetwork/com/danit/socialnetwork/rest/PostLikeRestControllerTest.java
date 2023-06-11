package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.PostCommentDtoSave;
import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.service.PostLikeServiceImpl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostLikeRestControllerTest {

  @InjectMocks
  PostLikeRestController postLikeRestController;

  @Mock
  PostLikeServiceImpl postLikeService;

  @Test
  public void testAddPostLike() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    Integer userId = 3;
    Integer postId = 2;
    PostLikeDto postLikeDto = new PostLikeDto();
    postLikeDto.setPostId(postId);
    postLikeDto.setUserId(userId);

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);

    PostLike postLike = new PostLike();
    postLike.setPostLikeId(4);
    postLike.setPostInPostLike(post);
    postLike.setUserPostLike(dbUser);
    postLike.setCreatedDateTime(LocalDateTime.now());

    when(postLikeService.savePostLike(any(PostLikeDto.class))).thenReturn(postLike);
    ResponseEntity<PostLikeDto> responseEntity = postLikeRestController.addPostLike(postLikeDto);
    Assertions.assertEquals(201, responseEntity.getStatusCodeValue());
    Assertions.assertEquals(postId, responseEntity.getBody().getPostId());
    Assertions.assertEquals(userId, responseEntity.getBody().getUserId());

  }

  @Test
  void testGetCountAllLikesByPostId() {

    Integer userId1 = 3;
    Integer userId2 = 4;
    Integer postId = 2;

    DbUser dbUser1 = new DbUser();
    dbUser1.setUserId(userId1);

    DbUser dbUser2 = new DbUser();
    dbUser2.setUserId(userId2);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(new DbUser());

    PostLike postLike1 = new PostLike();
    postLike1.setUserPostLike(dbUser1);
    postLike1.setPostInPostLike(post);

    PostLike postLike2 = new PostLike();
    postLike2.setUserPostLike(dbUser2);
    postLike2.setPostInPostLike(post);

    List<PostLike> postLikeList = new ArrayList<>(Arrays.asList(postLike1, postLike2));
    when(postLikeService.getCountAllLikesByPostId(postId)).thenReturn(2);
    Integer result = postLikeRestController.getCountAllLikesByPostId(postId);

    Assertions.assertEquals(2, result);


  }

  @Test
  void testIsExistPostLike() {

    Integer postId = 2;
    Integer userId = 3;


    when(postLikeService.isPresentPostLike(postId, userId)).thenReturn(true);
    when(postLikeService.isPresentPostLike(postId + 1, userId + 1))
        .thenReturn(false);
    Boolean result1 = postLikeRestController.isExistPostLike(postId, userId);
    Boolean result2 = postLikeRestController.isExistPostLike(postId + 1, userId + 1);
    Assertions.assertEquals(true, result1);
    Assertions.assertNotEquals(true, result2);


  }

  @Test
  void testDeletePostLike() {

    Integer postId = 2;
    Integer userId = 3;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);


    PostLike postLike = new PostLike();
    postLike.setPostLikeId(4);
    postLike.setPostInPostLike(post);
    postLike.setUserPostLike(dbUser);
    postLike.setCreatedDateTime(LocalDateTime.now());


    when(postLikeService.deletePostLike(postId, userId)).thenReturn(postLike);


    ResponseEntity<PostLikeDto> responseEntity = postLikeRestController.deletePostLike(postId, userId);

    Assertions.assertEquals(postId, responseEntity.getBody().getPostId());
    Assertions.assertEquals(userId, responseEntity.getBody().getUserId());
    Assertions.assertNotEquals(userId + 1, responseEntity.getBody().getUserId());
    Assertions.assertNotEquals(postId + 1, responseEntity.getBody().getPostId());

  }
}