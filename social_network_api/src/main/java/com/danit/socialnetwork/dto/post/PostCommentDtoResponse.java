package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.PostComment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostCommentDtoResponse {

  private String commentText;

  private LocalDateTime createdDateTime;

  private String name;

  private String username;

  private Integer userId;

  private Integer postCommentId;

  public static PostCommentDtoResponse from(PostComment postComment) {
    PostCommentDtoResponse postCommentDtoResponse = new PostCommentDtoResponse();
    postCommentDtoResponse.setCommentText(postComment.getCommentText());
    postCommentDtoResponse.setCreatedDateTime(postComment.getCreatedDateTime());
    postCommentDtoResponse.setName(postComment.getUserId().getName());
    postCommentDtoResponse.setUsername(postComment.getUserId().getUsername());
    postCommentDtoResponse.setUserId(postComment.getUserId().getUserId());
    postCommentDtoResponse.setPostCommentId(postComment.getPostCommentId());
    return postCommentDtoResponse;
  }

}
