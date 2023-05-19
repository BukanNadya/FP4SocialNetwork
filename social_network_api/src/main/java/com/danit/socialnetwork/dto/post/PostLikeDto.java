package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostLike;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostLikeDto {

  private Integer postId;
  private Integer userId;

  public static PostLikeDto from(PostLike thePostLike) {
    PostLikeDto postLikeDto = new PostLikeDto();
    postLikeDto.setPostId(thePostLike.getPostInPostLike().getPostId());
    postLikeDto.setUserId(thePostLike.getUserPostLike().getUserId());
    return postLikeDto;
  }

}
