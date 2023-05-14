package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.Post;

import java.util.List;

public interface PostService {

  List<PostDtoResponse> getAllPostsFromToFollow(Integer userFollowerId);

  List<PostDtoResponse> getAllPosts();

  Post savePost(PostDtoSave thePostDtoSave);
}
