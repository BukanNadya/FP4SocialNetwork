package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.UserFollowRequest;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.UserFollow;
import com.danit.socialnetwork.repository.UserFollowRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserFollowServiceImplTest {

    @InjectMocks
    UserFollowServiceImpl userFollowService;

    @Mock
    UserFollowRepository userFollowRepository;

    @Test
    void getAllUsersByUserFollowerId() {

        DbUser user1 = new DbUser();
        user1.setUserId(1);
        user1.setUsername("Tom");
        user1.setName("Tommy");

        DbUser user2 = new DbUser();
        user2.setUserId(2);
        user2.setUsername("Jim");
        user2.setName("Jimmy");

        UserFollow userFollow1 = new UserFollow();
        userFollow1.setUserFollowerId(user1);
        userFollow1.setUserFollowingId(user2);

        DbUser user3 = new DbUser();
        user3.setUserId(3);
        user3.setUsername("John1");
        user3.setName("Johny1");

        DbUser user4 = new DbUser();
        user4.setUserId(4);
        user4.setUsername("Nick");
        user4.setName("Nicky");

        UserFollow userFollow2 = new UserFollow();
        userFollow2.setUserFollowerId(user3);
        userFollow2.setUserFollowingId(user4);

        List<UserFollow> list = Arrays.asList(userFollow1, userFollow2);

        when(userFollowRepository.findAllByUserFollowerId(1)).thenReturn(list);

        List<UserFollowDtoResponse> responseEntity = userFollowService.getAllUsersByUserFollowerId(1);

        Assertions.assertEquals(2, responseEntity.size());
        Assertions.assertEquals("Jim", responseEntity.get(0).getUsername());
        Assertions.assertNotEquals("Johny", responseEntity.get(0).getUsername());
    }

    @Test
    void getAllUsersByUserFollowingId() {
        DbUser user1 = new DbUser();
        user1.setUserId(1);
        user1.setUsername("Tom");
        user1.setName("Tommy");

        DbUser user2 = new DbUser();
        user2.setUserId(2);
        user2.setUsername("Jim");
        user2.setName("Jimmy");

        UserFollow userFollow1 = new UserFollow();
        userFollow1.setUserFollowerId(user1);
        userFollow1.setUserFollowingId(user2);

        DbUser user3 = new DbUser();
        user3.setUserId(3);
        user3.setUsername("John1");
        user3.setName("Johny1");

        DbUser user4 = new DbUser();
        user4.setUserId(4);
        user4.setUsername("Nick");
        user4.setName("Nicky");

        UserFollow userFollow2 = new UserFollow();
        userFollow2.setUserFollowerId(user3);
        userFollow2.setUserFollowingId(user4);

        List<UserFollow> list = Arrays.asList(userFollow1, userFollow2);

        when(userFollowRepository.findAllByUserFollowingId(1)).thenReturn(list);

        List<UserFollowDtoResponse> responseEntity = userFollowService.getAllUsersByUserFollowingId(1);

        Assertions.assertEquals(2, responseEntity.size());
        Assertions.assertEquals("Tom", responseEntity.get(0).getUsername());
        Assertions.assertNotEquals("Jimmy", responseEntity.get(0).getUsername());
    }

    @Test
    void isFollowing() {
        DbUser user1 = new DbUser();
        user1.setUserId(1);

        DbUser user2 = new DbUser();
        user2.setUserId(2);

        UserFollow userFollow1 = new UserFollow();
        userFollow1.setUserFollowerId(user1);
        userFollow1.setUserFollowingId(user2);

        when(userFollowRepository.findUserFollowByUserFollowerIdAndUserFollowingId(
                1, 2)).thenReturn(Optional.of(userFollow1));

        UserFollowRequest userFollowRequest = new UserFollowRequest();
        userFollowRequest.setUserFollower(1);
        userFollowRequest.setUserFollowing(2);

        ResponseEntity<Map<String, String>> response = userFollowService.isFollowing(userFollowRequest);
        String status = response.getBody().get("following");
        Assertions.assertEquals("true", status);
    }
}