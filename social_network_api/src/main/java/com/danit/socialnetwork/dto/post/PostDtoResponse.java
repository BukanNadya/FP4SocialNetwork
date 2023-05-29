package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.model.PostLike;
import lombok.Data;
import lombok.NoArgsConstructor;

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
  private LocalDateTime sentDateTime;
  private Integer postCommentsCount;
  private Integer likesCount;

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


}
