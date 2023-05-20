package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.PostComment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCommentDtoSave {
  private Integer postId;
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
