package com.danit.socialnetwork.service;


import com.danit.socialnetwork.config.ImageHandlingConf;
import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.model.UserFollow;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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

  @Test
  public void testGetAllPostsFromToFollow() {

    DbUser user = new DbUser();
    user.setUserId(1);
    user.setUsername("John1");
    user.setName("Johny1");

    DbUser user1 = new DbUser();
    user1.setUserId(2);
    user1.setUsername("Tom");
    user1.setName("Tommy");

    DbUser user2 = new DbUser();
    user2.setUserId(3);
    user2.setUsername("Jim");
    user2.setName("Jimmy");

    UserFollow userFollow1 = new UserFollow();
    userFollow1.setUserFollowId(1);
    userFollow1.setUserFollowerId(user);
    userFollow1.setUserFollowingId(user1);

    UserFollow userFollow2 = new UserFollow();
    userFollow2.setUserFollowId(2);
    userFollow2.setUserFollowerId(user);
    userFollow2.setUserFollowingId(user2);

    Post post1 = new Post();
    post1.setPostId(1);
    post1.setUserPost(user1);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);

    post1.setPostComments(new ArrayList<PostComment>() {
    });

    Post post2 = new Post();
    post2.setPostId(2);
    post2.setUserPost(user2);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);

    post2.setPostComments(new ArrayList<PostComment>() {
    });

    List<Post> postList = new ArrayList<>(Arrays.asList(post1, post2));
    Pageable pagedByFivePosts =
        PageRequest.of(0, 12);

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, "John1", "Johny1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1))};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, "John2", "Johny2", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(1))};

    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Object[]> testList = Arrays.asList(objects1, objects2);


    when(postRepository.findAllPostsFromToFollowOneRequest(user.getUserId(), offset, pageSize)).thenReturn(testList);

    List<PostDtoResponse> result = postService.getAllPostsFromToFollowWithNativeQuery(
        user.getUserId(), 0);
    Assertions.assertEquals(result.get(0).getWrittenText(), objects1[3]);
    Assertions.assertEquals(result.get(1).getWrittenText(), objects2[3]);
    Assertions.assertEquals(result.get(0).getUsername(), objects1[5]);
    Assertions.assertEquals(result.get(1).getUsername(), objects2[5]);
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  public void testGetAllPosts() {
    Post post1 = new Post();
    post1.setPostId(1);
    DbUser user = new DbUser();
    user.setUsername("John1");
    user.setName("Johny1");
    post1.setUserPost(user);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);
    post1.setPostComments(new ArrayList<>() {
    });

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, "John1", "Johny1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1))};

    Post post2 = new Post();
    post2.setPostId(2);
    DbUser user2 = new DbUser();
    user2.setUsername("John2");
    user2.setName("Johny2");
    post2.setUserPost(user);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);

    post2.setPostComments(new ArrayList<>() {
    });

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, "John2", "Johny2", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(1))};


    int pageSize = 12;
    int offset = 0 * pageSize;

    List<Post> postList = new ArrayList<>(Arrays.asList(post1, post2));
    Page<Post> pagePost = new PageImpl<>(postList);

    List<Object[]> testList = Arrays.asList(objects1, objects2);

    when(postRepository.findAll(offset, pageSize)).thenReturn(testList);
    List<PostDtoResponse> result = postService.getAllPosts(0);
    Assertions.assertEquals(result.get(0).getWrittenText(), objects1[3]);
    Assertions.assertEquals(result.get(1).getName(), objects2[6]);
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  public void testSavePost() {

    byte [] photoFileByteArray = new byte[]{49, 48, 58, 50, 52, 58, 50, 54};

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

    Integer userId = 1;

    DbUser user = new DbUser();
    user.setUserId(userId);
    user.setUsername("John1");
    user.setName("Johny1");

    Post post1 = new Post();
    post1.setPostId(1);
    post1.setUserPost(user);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);

    post1.setPostComments(new ArrayList<PostComment>() {
    });

    Post post2 = new Post();
    post2.setPostId(2);
    post2.setUserPost(user);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);

    post2.setPostComments(new ArrayList<PostComment>() {
    });

    List<Post> postList = Arrays.asList(post1, post2);
    Pageable pagedByTenPosts =
        PageRequest.of(0, 10);

    Repost repost = new Repost();

    when(postRepository.findAllByUserId(user.getUserId(), pagedByTenPosts)).thenReturn(postList);
    when(repostRepository.findRepostByPostIdAndUserId(post1.getPostId(),userId))
        .thenReturn(Optional.of(repost));
    List<PostDtoResponse> result = postService.getAllOwnPosts(userId, 0);

    Assertions.assertEquals(result.get(0).getWrittenText(), post1.getWrittenText());
    Assertions.assertEquals(result.get(1).getName(), post2.getUserPost().getName());
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  void getAllLikedPosts() {
    Integer userId = 1;

    DbUser user = new DbUser();
    user.setUserId(userId);
    user.setUsername("John1");
    user.setName("Johny1");

    Post post1 = new Post();
    post1.setPostId(1);
    post1.setUserPost(user);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);

    post1.setPostComments(new ArrayList<PostComment>() {
    });

    Post post2 = new Post();
    post2.setPostId(2);
    post2.setUserPost(user);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);

    post2.setPostComments(new ArrayList<PostComment>() {
    });

    List<Post> postList = Arrays.asList(post1, post2);
    Pageable pagedByTenPosts =
        PageRequest.of(0, 10);

    Repost repost = new Repost();

    when(postRepository.findAllByUserIdLiked(user.getUserId(), pagedByTenPosts)).thenReturn(postList);
    when(repostRepository.findRepostByPostIdAndUserId(post1.getPostId(),userId))
        .thenReturn(Optional.of(repost));
    List<PostDtoResponse> result = postService.getAllLikedPosts(userId, 0);

    Assertions.assertEquals(result.get(0).getWrittenText(), post1.getWrittenText());
    Assertions.assertEquals(result.get(1).getName(), post2.getUserPost().getName());
    Assertions.assertEquals(2, result.toArray().length);

  }

  @Test
  void getAllPostsAndRepostsByUserId() {

    Integer userId = 1;

    DbUser user = new DbUser();
    user.setUserId(userId);
    user.setUsername("John1");
    user.setName("Johny1");

    Post post1 = new Post();
    post1.setPostId(1);
    post1.setUserPost(user);
    post1.setWrittenText("Hello world1");
    post1.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post1.setSentDateTime(dateTime);

    post1.setPostComments(new ArrayList<PostComment>() {
    });

    Post post2 = new Post();
    post2.setPostId(2);
    post2.setUserPost(user);
    post2.setWrittenText("Hello world2");
    post2.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime2 = LocalDateTime.now();
    post2.setSentDateTime(dateTime2);

    post2.setPostComments(new ArrayList<PostComment>() {
    });

    List<Post> postList = Arrays.asList(post1, post2);
    Pageable pagedByTenPosts =
        PageRequest.of(0, 10);

    when(postRepository.findAllPostsAndRepostsByUserIdAsPost(user.getUserId(), pagedByTenPosts)).thenReturn(postList);

    List<PostDtoResponse> result = postService.getAllPostsAndRepostsByUserId(userId, 0);

    Assertions.assertEquals(result.get(0).getWrittenText(), post1.getWrittenText());
    Assertions.assertEquals(result.get(1).getName(), post2.getUserPost().getName());
    Assertions.assertEquals(2, result.toArray().length);


  }

  @Test
  void getAllPostsWithShowingRepostByUserId() {

    Object[] objects1 = new Object[]{1, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world1",
        2, "John1", "Johny1", new BigInteger(String.valueOf(1)), new BigInteger(String.valueOf(1)),
        new BigInteger(String.valueOf(1))};

    Object[] objects2 = new Object[]{2, "MTA6MjQ6MjY=", new Timestamp(System.currentTimeMillis()), "Hello world2",
        3, "John2", "Johny2", new BigInteger(String.valueOf(2)), new BigInteger(String.valueOf(2)),
        new BigInteger(String.valueOf(1))};


    List<Object[]> testList = Arrays.asList(objects1, objects2);

    int pageSize = 12;
    int offset = 0 * pageSize;

    when(postRepository.findAllPostsWithShowingRepostsByUserId(1, offset, pageSize)).thenReturn(testList);
    List<PostDtoResponse> result = postService.getAllPostsWithShowingRepostByUserId(1, 0);

    Assertions.assertEquals(result.get(0).getWrittenText(), objects1[3]);
    Assertions.assertEquals(result.get(1).getWrittenText(), objects2[3]);
    Assertions.assertEquals(result.get(0).getUsername(), objects1[5]);
    Assertions.assertEquals(result.get(1).getUsername(), objects2[5]);
    Assertions.assertEquals(2, result.toArray().length);
  }
}