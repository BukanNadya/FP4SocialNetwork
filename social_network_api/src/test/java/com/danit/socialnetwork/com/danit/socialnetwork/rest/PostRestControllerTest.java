package com.danit.socialnetwork.rest;


import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.service.PostServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostRestControllerTest {

  @InjectMocks
  PostRestController postRestController;
  @Mock
  PostServiceImpl postService;

  @Test
  void testGetAllPosts() {
    PostDtoResponse postDtoResponse1 = new PostDtoResponse(1,
        "Nick", "nick", "Hello world 1",
        "photoLink1");
    PostDtoResponse postDtoResponse2 = new PostDtoResponse(12,
        "Tom", "tom", "Hello world 12",
        "photoLink2");
    List<PostDtoResponse> postDtoResponseList = Arrays.asList(postDtoResponse1, postDtoResponse2);
    when(postService.getAllPosts(0)).thenReturn(postDtoResponseList);
    List<PostDtoResponse> result = postRestController.getAllPostsFromFollowing(0, 0);

    assertEquals(result.get(0).getUsername(), postDtoResponse1.getUsername());
    assertEquals(result.get(1).getName(), postDtoResponse2.getName());
    assertEquals(2, result.toArray().length);

  }

  @Test
  void testAddPost() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    PostDtoSave postDtoSave = new PostDtoSave();
    postDtoSave.setUserId(2);
    postDtoSave.setWrittenText("Hello world1");
    postDtoSave.setPhotoFileByteArray(new byte[]{49, 48, 58, 50, 52, 58, 50, 54});

    Post post1 = new Post();
    post1.setPostId(2);
    DbUser user = new DbUser();
    user.setUsername("John1");
    user.setName("Johny1");
    post1.setUserPost(user);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);
    post1.setPostComments(new ArrayList<PostComment>() {
    });

    when(postService.savePost(any(PostDtoSave.class))).thenReturn(post1);
    ResponseEntity<PostDtoResponse> responseEntity = postRestController.addPost(postDtoSave);
    assertEquals(201, responseEntity.getStatusCodeValue());
    assertEquals("Hello world1", responseEntity.getBody().getWrittenText());

  }

  @Test
  void getAllOwnPosts() {
    PostDtoResponse postDtoResponse1 = new PostDtoResponse(1,
        "Nick", "nick", "Hello world 1",
        "photoLink1");
    PostDtoResponse postDtoResponse2 = new PostDtoResponse(12,
        "Tom", "tom", "Hello world 12",
        "photoLink2");
    List<PostDtoResponse> postDtoResponseList = Arrays.asList(postDtoResponse1, postDtoResponse2);
    when(postService.getAllOwnPosts(1, 0)).thenReturn(postDtoResponseList);
    List<PostDtoResponse> result = postRestController.getAllOwnPosts(1, 0);

    assertEquals(result.get(0).getUsername(), postDtoResponse1.getUsername());
    assertEquals(result.get(1).getName(), postDtoResponse2.getName());
    assertEquals(2, result.toArray().length);
  }


  @Test
  void getAllLikedPosts() {

    PostDtoResponse postDtoResponse1 = new PostDtoResponse(1,
        "Nick", "nick", "Hello world 1",
        "photoLink1");
    PostDtoResponse postDtoResponse2 = new PostDtoResponse(12,
        "Tom", "tom", "Hello world 12",
        "photoLink2");
    List<PostDtoResponse> postDtoResponseList = Arrays.asList(postDtoResponse1, postDtoResponse2);
    when(postService.getAllLikedPosts(1, 0)).thenReturn(postDtoResponseList);
    List<PostDtoResponse> result = postRestController.getAllLikedPosts(1, 0);

    assertEquals(result.get(0).getUsername(), postDtoResponse1.getUsername());
    assertEquals(result.get(1).getName(), postDtoResponse2.getName());
    assertEquals(2, result.toArray().length);

  }

  @Test
  void getAllPostsAndRepostsByUserId() {
    PostDtoResponse post1 = new PostDtoResponse();
    PostDtoResponse post2 = new PostDtoResponse();
    PostDtoResponse post3 = new PostDtoResponse();
    PostDtoResponse post4 = new PostDtoResponse();

    List<PostDtoResponse> repostDtoMixes = Arrays.asList(post1, post2, post3, post4);
    when(postService.getAllPostsAndRepostsByUserId(1, 0)).thenReturn(repostDtoMixes);
    List<PostDtoResponse> result = postRestController.getAllPostsAndRepostsByUserId(1, 0);
    assertEquals(4, result.toArray().length);
  }

  @Test
  void getAllPostsWithShowingRepostByUserId() {
    PostDtoResponse postDtoResponse1 = new PostDtoResponse(1,
        "Nick", "nick", "Hello world 1",
        "photoLink1");
    PostDtoResponse postDtoResponse2 = new PostDtoResponse(12,
        "Tom", "tom", "Hello world 12",
        "photoLink2");
    List<PostDtoResponse> postDtoResponseList = Arrays.asList(postDtoResponse1, postDtoResponse2);
    when(postService.getAllPostsWithShowingRepostByUserId(1, 0)).thenReturn(postDtoResponseList);
    List<PostDtoResponse> result = postRestController.getAllPostsWithShowingRepostByUserId(1, 0);

    assertEquals(result.get(0).getUsername(), postDtoResponse1.getUsername());
    assertEquals(result.get(1).getName(), postDtoResponse2.getName());
    assertEquals(2, result.toArray().length);
  }

  @Test
  void testAddPost_InvalidInput_ReturnsBadRequest() {
    PostDtoSave postDtoSave = new PostDtoSave();

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();
    Set<ConstraintViolation<PostDtoSave>> violations = validator.validate(postDtoSave);

    assertEquals(1, violations.size());

  }

  @Test
  void getPostByPostId() {
    PostDtoResponse post = new PostDtoResponse();
    Integer postId = 1;
    Integer userId = 2;
    post.setPostId(postId);

    when(postService.getPostByPostId(postId, userId)).thenReturn(post);

    PostDtoResponse result = postRestController.getPostByPostId(1, 2);

    assertEquals(1, result.getPostId());

  }

  @Test
  void addViews() {

    HttpStatus httpStatus = HttpStatus.OK;

    when(postService.addViews(new Integer[]{1, 2, 3})).thenReturn(httpStatus);

    HttpStatus result = postRestController.addViews(new Integer[]{1, 2, 3});

    assertEquals(httpStatus, result);


  }
}