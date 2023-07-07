package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.service.RepostServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RepostRestControllerTest {

  @InjectMocks
  RepostRestController repostRestController;

  @Mock
  RepostServiceImpl repostService;

  @Test
  void addRepost() {
    Repost repost = new Repost();
    Post post1 = new Post();
    post1.setPostId(2);
    DbUser user = new DbUser();
    post1.setUserPost(user);
    repost.setPostId(post1);
    DbUser user2 = new DbUser();
    user2.setUserId(2);
    repost.setUserId(user2);

    RepostDtoSave repostDtoSave = new RepostDtoSave();

    when(repostService.saveRepost(any(RepostDtoSave.class))).thenReturn(repost);
    ResponseEntity<RepostDtoSave> responseEntity = repostRestController.addRepost(repostDtoSave);

    Assertions.assertEquals(201, responseEntity.getStatusCodeValue());

  }

  @Test
  void getAllRepostsByUserId() {

    RepostDtoResponse repost1 = new RepostDtoResponse();
    RepostDtoResponse repost2 = new RepostDtoResponse();
    RepostDtoResponse repost3 = new RepostDtoResponse();
    RepostDtoResponse repost4 = new RepostDtoResponse();

    List<RepostDtoResponse> repostList = Arrays.asList(repost1, repost2, repost3, repost4);

    when(repostService.getAllRepostsByUserId(1, 0, "Europe/London")).thenReturn(repostList);
    List<RepostDtoResponse> list = repostRestController.getAllRepostsByUserId(1, 0, "Europe/London");

    Assertions.assertEquals(4, list.size());


  }

  @Test
  void deleteRepost() {

    Integer postId = 2;
    Integer userId = 3;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);


    Repost repost = new Repost();
    repost.setSharedId(4);
    repost.setPostId(post);
    repost.setUserId(dbUser);
    repost.setRepostedDateTime(LocalDateTime.now());


    when(repostService.deleteRepost(postId, userId)).thenReturn(repost);


    Repost responseEntity = repostService.deleteRepost(postId, userId);

    Assertions.assertEquals(postId, responseEntity.getPostId().getPostId());
    Assertions.assertEquals(userId, responseEntity.getUserId().getUserId());
    Assertions.assertNotEquals(userId + 1, responseEntity.getUserId().getUserId());
    Assertions.assertNotEquals(postId + 1, responseEntity.getPostId().getPostId());


  }

  @Test
  void isActiveRepost() {

    Integer postId = 2;
    Integer userId = 3;


    when(repostService.isActiveRepost(postId, userId)).thenReturn(true);
    when(repostService.isActiveRepost(postId + 1, userId + 1))
        .thenReturn(false);
    Boolean result1 = repostService.isActiveRepost(postId, userId);
    Boolean result2 = repostService.isActiveRepost(postId + 1, userId + 1);
    Assertions.assertEquals(true, result1);
    Assertions.assertNotEquals(true, result2);

  }

  @Test
  void testAddRepost_InvalidInput_ReturnsBadRequest() {
    RepostDtoSave repostDtoSave = new RepostDtoSave();
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();
    Set<ConstraintViolation<RepostDtoSave>> violations = validator.validate(repostDtoSave);
    assertEquals(2, violations.size());

  }

}