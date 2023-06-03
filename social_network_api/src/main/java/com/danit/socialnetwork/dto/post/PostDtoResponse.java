package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.PostLike;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@NoArgsConstructor
public class PostDtoResponse {

  private Integer postId;
  private String username;
  private String name;
  private Integer userId;
  private String writtenText;
  private byte[] photoFileByteArray;
  private byte[] profileImageByteArray;
  private LocalDateTime sentDateTime;
  private Integer postCommentsCount;
  private Integer likesCount;
  private Boolean isReposted;

  public PostDtoResponse(Integer postId, String username, String name, String writtenText, byte[] photoFileByteArray) {
    this.postId = postId;
    this.username = username;
    this.name = name;
    this.writtenText = writtenText;
    this.photoFileByteArray = photoFileByteArray;
  }

  public static PostDtoResponse from(Post post) {

    PostDtoResponse tempPostDto = new PostDtoResponse();
    tempPostDto.setPostId(post.getPostId());
    tempPostDto.setUsername(post.getUserPost().getUsername());
    tempPostDto.setName(post.getUserPost().getName());
    tempPostDto.setUserId(post.getUserPost().getUserId());
    tempPostDto.setWrittenText(post.getWrittenText());
    tempPostDto.setPhotoFileByteArray(Base64.getDecoder().decode(post.getPhotoFile()));
    tempPostDto.setSentDateTime(post.getSentDateTime());
    return tempPostDto;

  }

  public static PostDtoResponse mapToPostDtoResponse(Object[] result) {

    PostDtoResponse postDtoResponse = new PostDtoResponse();
    postDtoResponse.setPostId((Integer) result[0]);
    if (result[1] != null) {
      try {
        postDtoResponse.setPhotoFileByteArray(Base64.getDecoder()
            .decode((String) result[1]));
      } catch (RuntimeException exc) {
        postDtoResponse.setProfileImageByteArray(null);
      }
    }
    Timestamp timestamp = (Timestamp) result[2];
    LocalDateTime sentDateTime = timestamp.toLocalDateTime();
    postDtoResponse.setSentDateTime(sentDateTime);
    postDtoResponse.setWrittenText((String) result[3]);
    postDtoResponse.setUserId((Integer) result[4]);
    postDtoResponse.setUsername((String) result[5]);
    postDtoResponse.setName((String) result[6]);
    if (result[7] != null) {
      try {
        postDtoResponse.setProfileImageByteArray(Base64.getDecoder()
            .decode((String) result[7]));
      } catch (RuntimeException exc) {
        postDtoResponse.setProfileImageByteArray(null);
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
