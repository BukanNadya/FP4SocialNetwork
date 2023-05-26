package com.danit.socialnetwork.dto.post;

import com.danit.socialnetwork.model.Post;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;


@Data
@NoArgsConstructor
public class PostRepostDtoMix extends PostDtoResponse {
  private Boolean isRepost;

  public static PostRepostDtoMix from(Post post, Integer userId) {

    PostRepostDtoMix postRepostDtoMix = new PostRepostDtoMix();
    mapBaseFields(postRepostDtoMix, post);
    postRepostDtoMix.setPostCommentsCount(post.getPostComments().size());
    postRepostDtoMix.setIsRepost(!post.getUserPost().getUserId().equals(userId));
    return postRepostDtoMix;

  }

  private static void mapBaseFields(PostDtoResponse postDto, Post post) {
    postDto.setPostId(post.getPostId());
    postDto.setUsername(post.getUserPost().getUsername());
    postDto.setName(post.getUserPost().getName());
    postDto.setWrittenText(post.getWrittenText());
    postDto.setPhotoFileByteArray(decodeBase64(post.getPhotoFile()));
    postDto.setSentDateTime(post.getSentDateTime());
  }

  private static byte[] decodeBase64(String base64String) {
    return Base64.getDecoder().decode(base64String);
  }


}
