package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.io.Reader;
import java.math.BigInteger;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

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
  private Boolean isReposted;

  public PostDtoResponse(Integer postId, String username, String name, String writtenText, String photoFileLink) {
    this.postId = postId;
    this.username = username;
    this.name = name;
    this.writtenText = writtenText;
    this.photoFileLink = photoFileLink;
  }

  public static PostDtoResponse from(Post post) {

    PostDtoResponse tempPostDto = new PostDtoResponse();
    tempPostDto.setPostId(post.getPostId());
    tempPostDto.setUsername(post.getUserPost().getUsername());
    tempPostDto.setName(post.getUserPost().getName());
    tempPostDto.setUserId(post.getUserPost().getUserId());
    tempPostDto.setWrittenText(post.getWrittenText());
    tempPostDto.setProfileImageLink(post.getUserPost().getProfileImageUrl());
    tempPostDto.setPhotoFileLink(post.getPhotoFile());
    tempPostDto.setSentDateTime(post.getSentDateTime());
    return tempPostDto;
  }

  public static PostDtoResponse from(Post post, Integer userId) {
    PostDtoResponse postRepostDto = from(post);
    postRepostDto.setPostCommentsCount(post.getPostComments().size());
    postRepostDto.setIsReposted(!post.getUserPost().getUserId().equals(userId));
    return postRepostDto;

  }

  public static PostDtoResponse mapToPostDtoResponse(Object[] result) {

    PostDtoResponse postDtoResponse = new PostDtoResponse();
    postDtoResponse.setPostId((Integer) result[0]);
    if (result[1] instanceof Clob) {
      Clob clob = (Clob) result[1];
      try (Reader reader = clob.getCharacterStream()) {
        StringBuilder clobData = new StringBuilder();
        char[] buffer = new char[1024];
        int bytesRead;
        while ((bytesRead = reader.read(buffer)) != -1) {
          clobData.append(buffer, 0, bytesRead);
        }
        postDtoResponse.setPhotoFileLink(clobData.toString());
      } catch (IOException | SQLException e) {
        log.warn(String.format("Cannot get photo for post with postId = %s",
            postDtoResponse.getPostId()));
      }
    }
    Timestamp timestamp = (Timestamp) result[2];
    LocalDateTime sentDateTime = timestamp.toLocalDateTime();
    postDtoResponse.setSentDateTime(sentDateTime);
    postDtoResponse.setWrittenText((String) result[3]);
    postDtoResponse.setUserId((Integer) result[4]);
    postDtoResponse.setUsername((String) result[5]);
    postDtoResponse.setName((String) result[6]);
    if (result[7] instanceof Clob) {
      Clob clob = (Clob) result[7];
      try (Reader reader = clob.getCharacterStream()) {
        StringBuilder clobData = new StringBuilder();
        char[] buffer = new char[1024];
        int bytesRead;
        while ((bytesRead = reader.read(buffer)) != -1) {
          clobData.append(buffer, 0, bytesRead);
        }
        postDtoResponse.setProfileImageLink(clobData.toString());
      } catch (IOException | SQLException e) {
        log.warn(String.format("Cannot get photoProfileImage for user who posted with postId = %s ",
            postDtoResponse.getPostId()));
      }
    }
    postDtoResponse.setLikesCount(((BigInteger) result[8]).intValue()); // Convert BigInteger to Integer
    postDtoResponse.setPostCommentsCount(((BigInteger) result[9]).intValue()); // Convert BigInteger to Integer
    try {
      postDtoResponse.setIsReposted((Boolean) result[10].equals("true"));
    } catch (RuntimeException exc) {
      postDtoResponse.setIsReposted(null);
    }
    return postDtoResponse;
  }


}
