package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.PostCommentDtoResponse;
import com.danit.socialnetwork.dto.post.PostCommentDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.service.PostCommentServiceImpl;
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
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostCommentRestControllerTest {
  @InjectMocks
  PostCommentRestController postCommentRestController;

  @Mock
  PostCommentServiceImpl postCommentService;

  @Test
  void addPostComment() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    Integer userId = 3;
    Integer postId = 2;
    Integer postCommentId = 1;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);

    PostComment postComment = new PostComment();
    postComment.setUserId(dbUser);
    postComment.setPostId(post);
    postComment.setCommentText("Hello world!");
    postComment.setCreatedDateTime(LocalDateTime.now());
    postComment.setPostCommentId(postCommentId);

    PostCommentDtoSave postCommentDtoSave = new PostCommentDtoSave();
    postCommentDtoSave.setCommentText("Hey Hello world!");
    postCommentDtoSave.setUserId(userId);
    postCommentDtoSave.setPostId(postId);

    when(postCommentService.savePostComment(any(PostCommentDtoSave.class))).thenReturn(postComment);
    ResponseEntity<PostCommentDtoResponse> responseEntity = postCommentRestController.addPostComment(postCommentDtoSave);
    Assertions.assertEquals(postCommentId, responseEntity.getBody().getPostCommentId());
    Assertions.assertEquals(userId, responseEntity.getBody().getUserId());
    Assertions.assertEquals("Hello world!", responseEntity.getBody().getCommentText());

  }

  @Test
  void getAllComments() {

    Integer postId = 2;
    Integer userId1 = 3;
    Integer userId2 = 2;
    Integer userId3 = 4;
    Integer page = 0;

    DbUser dbUser1 = new DbUser();
    dbUser1.setUserId(userId1);

    DbUser dbUser2 = new DbUser();
    dbUser2.setUserId(userId2);
    dbUser2.setUsername("Nick");

    DbUser dbUser3 = new DbUser();
    dbUser3.setUserId(userId3);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser1);


    PostComment postComment1 = new PostComment();
    postComment1.setPostId(post);
    postComment1.setCommentText("Hello world 1");
    postComment1.setUserId(dbUser2);
    postComment1.setPostCommentId(1);

    PostComment postComment2 = new PostComment();
    postComment2.setPostId(post);
    postComment2.setCommentText("Hello world 2");
    postComment2.setUserId(dbUser3);
    postComment2.setPostCommentId(2);

    List<PostComment> postCommentList = Arrays.asList(postComment1, postComment2);
    when(postCommentService.getAllPostCommentsByPostId(postId, page)).thenReturn(postCommentList);

    List<PostCommentDtoResponse> responseEntity = postCommentRestController.getAllComments(postId, page);
    Assertions.assertEquals("Hello world 1", responseEntity.get(0).getCommentText());
    Assertions.assertEquals("Hello world 2", responseEntity.get(1).getCommentText());
    Assertions.assertEquals(userId2, responseEntity.get(0).getUserId());
    Assertions.assertNotEquals(userId1, responseEntity.get(0).getUserId());
    Assertions.assertEquals("Nick", responseEntity.get(0).getUsername());
    Assertions.assertEquals(2, responseEntity.size());
  }
}