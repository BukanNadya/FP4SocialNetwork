package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Repost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RepostDtoResponse extends PostDtoResponse {
  private LocalDateTime repostDateTime;

  public static RepostDtoResponse from(Repost repost) {

    RepostDtoResponse tempPostDto = new RepostDtoResponse();
    tempPostDto.setPostId(repost.getPostId().getPostId());
    tempPostDto.setUsername(repost.getPostId().getUserPost().getUsername());
    tempPostDto.setName(repost.getPostId().getUserPost().getName());
    tempPostDto.setUserId(repost.getPostId().getUserPost().getUserId());
    tempPostDto.setProfileImageLink(repost.getPostId().getUserPost().getProfileImageUrl());
    tempPostDto.setWrittenText(repost.getPostId().getWrittenText());
    tempPostDto.setPhotoFileLink(repost.getPostId().getPhotoFile());
    tempPostDto.setSentDateTime(repost.getPostId().getSentDateTime());
    tempPostDto.setRepostDateTime(repost.getRepostedDateTime());
    return tempPostDto;

  }


}
