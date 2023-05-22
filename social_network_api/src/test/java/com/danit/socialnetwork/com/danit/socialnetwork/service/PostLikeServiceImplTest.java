package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.repository.PostLikeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class PostLikeServiceImplTest {
  @InjectMocks
  PostLikeServiceImpl postLikeService;
  @Mock
  PostLikeRepository postLikeRepository;

  @Test
  void savePostLike() {

    Integer postId = 2;
    Integer userId = 3;

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

    when(postLikeRepository.findPostLikeByPostIdAndUserId(postId, userId))
        .thenReturn(Optional.of(postLike));

    PostLike result = postLikeService.savePostLike(postLikeDto);
    Assertions.assertEquals(postId, result.getPostInPostLike().getPostId());
    Assertions.assertEquals(userId, result.getUserPostLike().getUserId());

  }

  @Test
  void getAllPostLikesByPostId() {
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
    when(postLikeRepository.findAllPostLikesByPostId(postId)).thenReturn(postLikeList);
    List<PostLike> result = postLikeService.getAllPostLikesByPostId(postId);
    Assertions.assertEquals(postId, result.get(0).getPostInPostLike().getPostId());
    Assertions.assertEquals(userId1, result.get(0).getUserPostLike().getUserId());
    Assertions.assertEquals(userId2, result.get(1).getUserPostLike().getUserId());
    Assertions.assertEquals(2, result.size());

  }

  @Test
  void isPresentPostLike() {

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
    when(postLikeRepository.findPostLikeByPostIdAndUserId(postId, userId)).thenReturn(Optional.of(postLike));
    Boolean result = postLikeService.isPresentPostLike(postId, userId);

    Assertions.assertEquals(true, result);
    Assertions.assertNotEquals(false, result);

  }

  @Test
  void deletePostLike() {
    Integer postId = 2;
    Integer userId = 3;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);
    dbUser.setUsername("John1");

    Post post = new Post();
    post.setPostId(postId);
    post.setUserPost(dbUser);


    PostLike postLike = new PostLike();
    postLike.setPostLikeId(4);
    postLike.setPostInPostLike(post);
    postLike.setUserPostLike(dbUser);
    when(postLikeRepository.findPostLikeByPostIdAndUserId(postId, userId)).thenReturn(Optional.of(postLike));
    PostLike result = postLikeService.deletePostLike(postId, userId);

    Assertions.assertEquals(postId, result.getPostInPostLike().getPostId());
    Assertions.assertEquals(userId, result.getUserPostLike().getUserId());
    Assertions.assertEquals("John1", result.getUserPostLike().getUsername());
  }

}