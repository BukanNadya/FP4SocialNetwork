package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Repost;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
public class RepostDtoSave {
  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  Integer postId;

  @NotNull(message = "number required")
  @Positive(message = "positive number required")
  Integer userId;

  public static RepostDtoSave from(Repost repost) {
    RepostDtoSave postSharedDto = new RepostDtoSave();
    postSharedDto.setPostId(repost.getPostId().getPostId());
    postSharedDto.setUserId(repost.getUserId().getUserId());
    return postSharedDto;
  }

}
