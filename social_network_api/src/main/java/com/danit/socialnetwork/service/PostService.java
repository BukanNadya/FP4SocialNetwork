package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.Post;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface PostService {

  List<PostDtoResponse> getAllPosts(Integer page, String userTimeZone);

  List<PostDtoResponse> getAllPostsFromToFollowWithNativeQuery(Integer userFollowerId, Integer page, String userTimeZone);

  Post savePost(PostDtoSave thePostDtoSave);

  List<PostDtoResponse> getAllOwnPosts(Integer userId, Integer page, String userTimeZone);

  List<PostDtoResponse> getAllLikedPosts(Integer userId, Integer page, String userTimeZone);

  List<PostDtoResponse> getAllPostsAndRepostsByUserId(Integer userId, Integer page, String userTimeZone);

  List<PostDtoResponse> getAllPostsWithShowingRepostByUserId(Integer userId, Integer page, String userTimeZone);

  PostDtoResponse getPostByPostId(Integer postId, Integer userId, String userTimeZone);

  Integer findLatestPostIdByUserId(Integer userId);

  HttpStatus addViews(Integer[] postIdArray);

  Post findPostByPostId(Integer postId);

  Post deletePost(Integer postId);
}
