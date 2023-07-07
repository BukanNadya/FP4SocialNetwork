package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@Log4j2
public class PostDtoResponse {

  private Integer postId;
  private String username;
  private String name;
  private Integer userId;

  private String writtenText;
  private String photoFileLink;
  private String profileImageLink;
  private LocalDateTime sentDateTime;
  private Integer postCommentsCount;
  private Integer likesCount;
  private Integer repostsCount;
  private Boolean isReposted;

  private Integer viewCount;

  public PostDtoResponse(Integer postId, String username, String name, String writtenText, String photoFileLink) {
    this.postId = postId;
    this.username = username;
    this.name = name;
    this.writtenText = writtenText;
    this.photoFileLink = photoFileLink;
  }

  public static PostDtoResponse from(Post post, String userTimeZone) {

    PostDtoResponse tempPostDto = new PostDtoResponse();
    tempPostDto.setPostId(post.getPostId());
    tempPostDto.setUsername(post.getUserPost().getUsername());
    tempPostDto.setName(post.getUserPost().getName());
    tempPostDto.setUserId(post.getUserPost().getUserId());
    tempPostDto.setWrittenText(post.getWrittenText());
    tempPostDto.setProfileImageLink(post.getUserPost().getProfileImageUrl());
    tempPostDto.setPhotoFileLink(post.getPhotoFile());
    ZoneId utcZoneId = ZoneId.of("UTC"); // The stored time is in UTC
    ZoneId userZoneId = ZoneId.of(userTimeZone);
    ZonedDateTime utcDateTime = post.getSentDateTime().atZone(utcZoneId);
    ZonedDateTime userDateTime = utcDateTime.withZoneSameInstant(userZoneId);
    tempPostDto.setSentDateTime(userDateTime.toLocalDateTime());
    tempPostDto.setViewCount(post.getViewCount());
    return tempPostDto;
  }

  public static PostDtoResponse from(Post post, Integer userId, String userTimeZone) {
    PostDtoResponse postRepostDto = from(post, userTimeZone);
    postRepostDto.setPostCommentsCount(post.getPostComments().size());
    postRepostDto.setIsReposted(!post.getUserPost().getUserId().equals(userId));
    return postRepostDto;

  }


  public static PostDtoResponse mapToPostDtoResponse(Object[] result, String userTimeZone) {
    PostDtoResponse postDtoResponse = new PostDtoResponse();
    postDtoResponse.setPostId((Integer) result[0]);
    postDtoResponse.setPhotoFileLink((String) result[1]);
    Timestamp timestamp = (Timestamp) result[2];
    LocalDateTime sentDateTime = timestamp.toLocalDateTime();

    ZoneId utcZoneId = ZoneId.of("UTC"); // The stored time is in UTC
    ZoneId userZoneId = ZoneId.of(userTimeZone);
    ZonedDateTime utcDateTime = sentDateTime.atZone(utcZoneId);
    ZonedDateTime userDateTime = utcDateTime.withZoneSameInstant(userZoneId);
    postDtoResponse.setSentDateTime(userDateTime.toLocalDateTime());

    postDtoResponse.setWrittenText((String) result[3]);
    postDtoResponse.setUserId((Integer) result[4]);
    postDtoResponse.setViewCount((Integer) result[5]);
    postDtoResponse.setUsername((String) result[6]);
    postDtoResponse.setName((String) result[7]);
    postDtoResponse.setProfileImageLink((String) result[8]);
    postDtoResponse.setLikesCount(((BigInteger) result[9]).intValue()); // Convert BigInteger to Integer
    postDtoResponse.setPostCommentsCount(((BigInteger) result[10]).intValue()); // Convert BigInteger to Integer
    postDtoResponse.setRepostsCount(((BigInteger) result[11]).intValue());
    try {
      postDtoResponse.setIsReposted((Boolean) result[12].equals("true"));
    } catch (RuntimeException exc) {
      postDtoResponse.setIsReposted(null);
    }
    return postDtoResponse;
  }


}
