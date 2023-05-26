package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserFollowServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserFollowRestControllerTest {

  @InjectMocks
  UserFollowRestController userFollowRestController;

  @Mock
  UserFollowServiceImpl userFollowService;

  @Test
  void getAllFollowings() {
    UserFollowDtoResponse userFollowDtoResponse1 = new UserFollowDtoResponse();
    userFollowDtoResponse1.setUserId(1);
    userFollowDtoResponse1.setUsername("John");
    userFollowDtoResponse1.setName("Johny");

    UserFollowDtoResponse userFollowDtoResponse2 = new UserFollowDtoResponse();
    userFollowDtoResponse2.setUserId(2);
    userFollowDtoResponse2.setUsername("Leyla");
    userFollowDtoResponse2.setName("Lilly");

    List<UserFollowDtoResponse> list = Arrays.asList(userFollowDtoResponse1, userFollowDtoResponse2);

    when(userFollowService.getAllUsersByUserFollowerId(1)).thenReturn(list);

    ResponseEntity<List<UserFollowDtoResponse>> responseEntity = userFollowRestController.getAllFollowings(1);

    Assertions.assertEquals(2, responseEntity.getBody().size());
    Assertions.assertEquals("John", responseEntity.getBody().get(0).getUsername());
    Assertions.assertNotEquals("Johny", responseEntity.getBody().get(0).getUsername());

  }

  @Test
  void getAllFollowers() {
    UserFollowDtoResponse userFollowDtoResponse1 = new UserFollowDtoResponse();
    userFollowDtoResponse1.setUserId(1);
    userFollowDtoResponse1.setUsername("John");
    userFollowDtoResponse1.setName("Johny");

    UserFollowDtoResponse userFollowDtoResponse2 = new UserFollowDtoResponse();
    userFollowDtoResponse2.setUserId(2);
    userFollowDtoResponse2.setUsername("Leyla");
    userFollowDtoResponse2.setName("Lilly");

    List<UserFollowDtoResponse> list = Arrays.asList(userFollowDtoResponse1, userFollowDtoResponse2);

    when(userFollowService.getAllUsersByUserFollowingId(1)).thenReturn(list);
    ResponseEntity<List<UserFollowDtoResponse>> responseEntity = userFollowRestController.getAllFollowers(1);
    Assertions.assertEquals(2, responseEntity.getBody().size());
    Assertions.assertEquals("John", responseEntity.getBody().get(0).getUsername());
    Assertions.assertNotEquals("Johny", responseEntity.getBody().get(0).getUsername());
  }
}