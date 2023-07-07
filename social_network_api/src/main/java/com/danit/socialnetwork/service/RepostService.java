package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.model.Repost;

import java.util.List;

public interface RepostService {
  Repost saveRepost(com.danit.socialnetwork.dto.post.RepostDtoSave thePostSharedDto);

  List<RepostDtoResponse> getAllRepostsByUserId(Integer userId, Integer page, String userTimeZone);


  Repost deleteRepost(Integer postId, Integer userId);

  Boolean isActiveRepost(Integer postId, Integer userId);
}
