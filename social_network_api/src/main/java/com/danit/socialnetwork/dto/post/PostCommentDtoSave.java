package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.PostComment;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
public class PostCommentDtoSave {

  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer postId;

  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer userId;

  private String commentText;

  public static PostCommentDtoSave from(PostComment postComment) {
    PostCommentDtoSave postCommentDtoSave = new PostCommentDtoSave();
    postCommentDtoSave.setPostId(postComment.getPostId().getPostId());
    postCommentDtoSave.setUserId(postComment.getUserId().getUserId());
    postCommentDtoSave.setCommentText(postComment.getCommentText());
    return postCommentDtoSave;
  }

}
