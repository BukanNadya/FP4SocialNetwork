package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
public class PostLikeDto {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer postId;

  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  private Integer userId;

  public static PostLikeDto from(PostLike thePostLike) {
    PostLikeDto postLikeDto = new PostLikeDto();
    postLikeDto.setPostId(thePostLike.getPostId().getPostId());
    postLikeDto.setUserId(thePostLike.getUserId().getUserId());
    return postLikeDto;
  }

}
