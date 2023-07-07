package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Repost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
public class RepostDtoResponse extends PostDtoResponse {
  private LocalDateTime repostDateTime;

  public static RepostDtoResponse from(Repost repost, String userTimeZone) {

    RepostDtoResponse tempPostDto = new RepostDtoResponse();
    tempPostDto.setPostId(repost.getPostId().getPostId());
    tempPostDto.setUsername(repost.getPostId().getUserPost().getUsername());
    tempPostDto.setName(repost.getPostId().getUserPost().getName());
    tempPostDto.setUserId(repost.getPostId().getUserPost().getUserId());
    tempPostDto.setProfileImageLink(repost.getPostId().getUserPost().getProfileImageUrl());
    tempPostDto.setWrittenText(repost.getPostId().getWrittenText());
    tempPostDto.setPhotoFileLink(repost.getPostId().getPhotoFile());

    ZoneId utcZoneId = ZoneId.of("UTC"); // The stored time is in UTC
    ZoneId userZoneId = ZoneId.of(userTimeZone);

    ZonedDateTime utcDateTimeRepost = repost.getRepostedDateTime().atZone(utcZoneId);
    ZonedDateTime userDateTimeRepost = utcDateTimeRepost.withZoneSameInstant(userZoneId);
    tempPostDto.setRepostDateTime(userDateTimeRepost.toLocalDateTime());

    ZonedDateTime utcDateTimePost = repost.getPostId().getSentDateTime().atZone(utcZoneId);
    ZonedDateTime userDateTimePost = utcDateTimePost.withZoneSameInstant(userZoneId);
    tempPostDto.setSentDateTime(userDateTimePost.toLocalDateTime());
    return tempPostDto;

  }


}
