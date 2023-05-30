package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.model.PostLike;

import java.util.List;

public interface PostLikeService {

  PostLike savePostLike(PostLikeDto postLikeDto);

  List<PostLike> getAllPostLikesByPostId(Integer postId);

  Boolean isPresentPostLike(Integer postId, Integer userId);

  PostLike deletePostLike(Integer postId, Integer userId);

  Integer getCountAllLikesByPostId(Integer postId);
}
