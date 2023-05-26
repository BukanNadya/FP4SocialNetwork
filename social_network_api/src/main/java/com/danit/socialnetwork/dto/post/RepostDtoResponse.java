package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Repost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
public class RepostDtoResponse extends PostDtoResponse {
  private LocalDateTime repostDateTime;

  public static RepostDtoResponse from(Repost repost) {

    RepostDtoResponse tempPostDto = new RepostDtoResponse();
    tempPostDto.setPostId(repost.getPostId().getPostId());
    tempPostDto.setUsername(repost.getPostId().getUserPost().getUsername());
    tempPostDto.setName(repost.getPostId().getUserPost().getName());
    tempPostDto.setWrittenText(repost.getPostId().getWrittenText());
    tempPostDto.setPhotoFileByteArray(Base64.getDecoder().decode(repost.getPostId().getPhotoFile()));
    tempPostDto.setSentDateTime(repost.getPostId().getSentDateTime());
    tempPostDto.setRepostDateTime(repost.getRepostedDateTime());
    return tempPostDto;

  }


}
