package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.RepostRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RepostServiceImplTest {

  @InjectMocks
  RepostServiceImpl repostService;

  @Mock
  RepostRepository repostRepository;

  @Mock
  ModelMapper modelMapper;

  @Mock
  PostLikeRepository postLikeRepository;


  @Test
  void saveRepost() {

    Integer userId = 2;
    Integer postId = 3;

    Repost repost = new Repost();
    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);
    repost.setUserId(dbUser);
    Post post = new Post();
    post.setPostId(postId);
    repost.setPostId(post);

    RepostDtoSave repostDtoSave = new RepostDtoSave();

    when(modelMapper.map(repostDtoSave, Repost.class)).thenReturn(repost);
    when(repostRepository.save(any(Repost.class))).thenReturn(repost);

    Repost result = repostService.saveRepost(repostDtoSave);

    Assertions.assertEquals(userId, result.getUserId().getUserId());
    Assertions.assertEquals(postId, result.getPostId().getPostId());

  }

  @Test
  void getAllRepostsByUserId() {

    Integer userId = 1;
    Integer postId1 = 1;
    Integer postId2 = 2;
    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);
    dbUser.setUsername("John");
    dbUser.setName("Johny");

    DbUser dbUser1 = new DbUser();
    dbUser1.setUserId(2);
    dbUser1.setUsername("Jim");
    dbUser1.setName("Jimmy");

    DbUser dbUser2 = new DbUser();
    dbUser2.setUserId(3);
    dbUser2.setUsername("Tom");
    dbUser2.setName("Tommy");


    Repost repost1 = new Repost();

    repost1.setUserId(dbUser);
    Post post1 = new Post();
    post1.setPostId(postId1);
    post1.setUserPost(dbUser1);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime1 = LocalDateTime.now();
    post1.setSentDateTime(dateTime1);
    post1.setPostComments(new ArrayList<>() {
    });
    repost1.setPostId(post1);

    Repost repost2 = new Repost();
    repost1.setUserId(dbUser);
    Post post2 = new Post();
    post2.setUserPost(dbUser2);
    post2.setPostId(postId2);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);
    post2.setPostComments(new ArrayList<>() {
    });
    repost2.setPostId(post2);

    Integer page = 0;
    Pageable pagedByTenPosts =
        PageRequest.of(page, 10);

    List<Repost> repostList = Arrays.asList(repost1, repost2);

    when(repostRepository.findAllByUserId(1, pagedByTenPosts)).thenReturn(repostList);
    List<RepostDtoResponse> responseList = repostService.getAllRepostsByUserId(1, 0);

    Assertions.assertEquals(responseList.get(0).getWrittenText(), post1.getWrittenText());
    Assertions.assertEquals(responseList.get(1).getWrittenText(), post2.getWrittenText());
    Assertions.assertEquals(responseList.get(0).getUsername(), dbUser1.getUsername());
    Assertions.assertEquals(responseList.get(1).getUsername(), dbUser2.getUsername());
    Assertions.assertEquals(2, responseList.toArray().length);

  }

  @Test
  void deleteRepost() {

    Integer postId = 2;
    Integer userId = 3;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);
    dbUser.setUsername("John1");

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);

    Repost repost = new Repost();
    repost.setPostId(post);
    repost.setSharedId(4);
    repost.setUserId(dbUser);
    repost.setRepostedDateTime(LocalDateTime.now());
    when(repostRepository.findRepostByPostIdAndUserId(postId, userId)).thenReturn(Optional.of(repost));
    Repost result = repostService.deleteRepost(postId,userId);

    Assertions.assertEquals(postId, result.getPostId().getPostId());
    Assertions.assertEquals(userId, result.getUserId().getUserId());
    Assertions.assertEquals("John1", result.getUserId().getUsername());

  }

  @Test
  void isActiveRepost() {

    Integer postId = 2;
    Integer userId = 3;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);

    Repost repost = new Repost();
    repost.setPostId(post);
    repost.setSharedId(4);
    repost.setUserId(dbUser);
    repost.setRepostedDateTime(LocalDateTime.now());
    when(repostRepository.findRepostByPostIdAndUserId(postId, userId)).thenReturn(Optional.of(repost));
    Boolean result = repostService.isActiveRepost(postId, userId);

    Assertions.assertEquals(true, result);
    Assertions.assertNotEquals(false, result);

  }
}