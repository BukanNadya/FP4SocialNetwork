package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.PostCommentDtoSave;
import com.danit.socialnetwork.model.PostComment;

import java.util.List;

public interface PostCommentService {

  PostComment savePostComment(PostCommentDtoSave postCommentDtoSave);

  List<PostComment> getAllPostCommentsByPostId(Integer postId, Integer page);

  PostComment deletePostComment(Integer postCommentId);
}
