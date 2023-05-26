package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Repost;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RepostDtoSave {

  Integer postId;
  Integer userId;

  public static RepostDtoSave from(Repost repost) {
    RepostDtoSave postSharedDto = new RepostDtoSave();
    postSharedDto.setPostId(repost.getPostId().getPostId());
    postSharedDto.setUserId(repost.getUserId().getUserId());
    return postSharedDto;
  }

}
