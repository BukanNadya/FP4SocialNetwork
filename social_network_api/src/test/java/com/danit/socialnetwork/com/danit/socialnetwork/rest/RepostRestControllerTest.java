package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.service.RepostServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    when(repostService.getAllRepostsByUserId(1, 0)).thenReturn(repostList);
    List<RepostDtoResponse> list = repostRestController.getAllRepostsByUserId(1, 0);

    Assertions.assertEquals(4, list.size());


  }
}