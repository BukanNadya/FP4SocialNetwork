package com.danit.socialnetwork.service;


import com.danit.socialnetwork.config.ImageHandlingConf;
import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.PostRepository;
import com.danit.socialnetwork.repository.RepostRepository;
import com.danit.socialnetwork.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class PostServiceImplTest {
  @InjectMocks
  PostServiceImpl postService;
  @Mock
  PostRepository postRepository;
  @Mock
  UserRepository userRepository;
  @Mock
  PostLikeRepository postLikeRepository;
  @Mock
  RepostRepository repostRepository;

  @Mock
  ImageHandlingConf imageHandlingConf;

  private Map<Integer, Integer> accumulatedViewCounts = new HashMap<>();

  @Test
  public void testGetAllPostsFromToFollow() {

    DbUser user = new DbUser();
    user.setUserId(1);
    user.setUsername("John1");
    user.setName("Johny1");

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, 3, "John1", "Johny1", "photoLink1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1)), false};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, 4, "John2", "Johny2", "photoLink1", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(4)), false};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAllPostsFromToFollowOneRequest(user.getUserId(), offset, pageSize)).thenReturn(testList);

    List<PostDtoResponse> result = postService.getAllPostsFromToFollowWithNativeQuery(
        user.getUserId(), 0);
    Assertions.assertEquals(result.get(0).getWrittenText(), objects1[3]);
    Assertions.assertEquals(result.get(1).getWrittenText(), objects2[3]);
    Assertions.assertEquals(result.get(0).getUsername(), objects1[6]);
    Assertions.assertEquals(result.get(1).getUsername(), objects2[6]);
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  public void testGetAllPosts() {

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, 3, "John1", "Johny1", "photoLink1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1)), false};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, 4, "John2", "Johny2", "photoLink1", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(4)), false};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAll(offset, pageSize)).thenReturn(testList);
    List<PostDtoResponse> result = postService.getAllPosts(0);
    Assertions.assertEquals(result.get(0).getWrittenText(), objects1[3]);
    Assertions.assertEquals(result.get(1).getName(), objects2[7]);
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  public void testSavePost() {

    byte[] photoFileByteArray = new byte[]{49, 48, 58, 50, 52, 58, 50, 54};

    PostDtoSave postDtoSave = new PostDtoSave();
    postDtoSave.setUserId(2);
    postDtoSave.setWrittenText("Hello world1");
    postDtoSave.setPhotoFileByteArray(photoFileByteArray);

    DbUser user = new DbUser();
    user.setUserId(2);
    user.setUsername("John1");
    user.setName("Johny1");

    Post tempPost = Post.from(postDtoSave, user, "photoLink");

    when(userRepository.findById(postDtoSave.getUserId())).thenReturn(Optional.of(user));
    when(postRepository.save(any(Post.class))).thenReturn(tempPost);
    when(imageHandlingConf.uploadImage(photoFileByteArray, "production")).thenReturn("photoLink");

    Post post = postService.savePost(postDtoSave);

    Assertions.assertEquals(post.getWrittenText(), postDtoSave.getWrittenText());
    Assertions.assertEquals(post.getUserPost().getUsername(), user.getUsername());

  }

  @Test
  void getAllOwnPosts() {

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, 3, "John1", "Johny1", "photoLink1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1)), false};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, 4, "John2", "Johny2", "photoLink1", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(4)), false};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAllByUserIdOneQuery(1, offset, pageSize)).thenReturn(testList);
    List<PostDtoResponse> result = postService.getAllOwnPosts(1, 0);

    Assertions.assertEquals(objects1[3], result.get(0).getWrittenText());
    Assertions.assertEquals(objects2[7], result.get(1).getName());
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  void getAllLikedPosts() {
    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, 3, "John1", "Johny1", "photoLink1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1)), false};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, 4, "John2", "Johny2", "photoLink1", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(4)), false};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAllByUserIdLikedOneQuery(1, offset, pageSize)).thenReturn(testList);
    List<PostDtoResponse> result = postService.getAllLikedPosts(1, 0);
    Assertions.assertEquals(objects1[3], result.get(0).getWrittenText());
    Assertions.assertEquals(objects2[7], result.get(1).getName());
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  void getAllPostsAndRepostsByUserId() {

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, 3, "John1", "Johny1", "photoLink1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1)), false};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, 4, "John2", "Johny2", "photoLink1", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(4)), false};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAllPostsAndRepostsByUserIdAsPostOneQuery(1, offset, pageSize)).thenReturn(testList);

    List<PostDtoResponse> result = postService.getAllPostsAndRepostsByUserId(1, 0);

    Assertions.assertEquals(objects2[7], result.get(1).getName());
    Assertions.assertEquals(2, result.toArray().length);
    Assertions.assertEquals(objects1[3], result.get(0).getWrittenText());
    Assertions.assertEquals(objects2[3], result.get(1).getWrittenText());
    Assertions.assertEquals(objects1[6], result.get(0).getUsername());
    Assertions.assertEquals(objects2[6], result.get(1).getUsername());

  }

  @Test
  void getPostByPostId() {
    Integer postId = 2;
    Post post = new Post();
    post.setPostId(2);

    when(postRepository.findById(postId)).thenReturn(Optional.of(post));
    Post result = postRepository.findById(postId).get();
    Assertions.assertEquals(postId, result.getPostId());

  }


  @Test
  void incrementViewCount() {
    Integer postId = 1;
    assertEquals(postId, postService.incrementViewCount(postId));
  }

}