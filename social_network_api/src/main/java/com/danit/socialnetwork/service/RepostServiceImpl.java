package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.repository.PostLikeRepository;
import com.danit.socialnetwork.repository.RepostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class RepostServiceImpl implements RepostService {

  private final RepostRepository repostRepository;
  private final ModelMapper modelMapper;
  private final PostLikeRepository postLikeRepository;

  private RepostDtoResponse from(Repost repost) {
    RepostDtoResponse postDtoResponse = RepostDtoResponse.from(repost);
    postDtoResponse.setLikesCount(postLikeRepository
        .findCountAllLikesByPostId(repost.getPostId().getPostId()));
    postDtoResponse.setPostCommentsCount(repost.getPostId().getPostComments().size());
    return postDtoResponse;
  }


  /*Method save repost*/
  @Override
  public Repost saveRepost(com.danit.socialnetwork.dto.post.RepostDtoSave theRepostDto) {
    Repost repost = this.modelMapper.map(theRepostDto, Repost.class);
    repost.setSharedId(0);
    repost.setRepostedDateTime(LocalDateTime.now());
    return repostRepository.save(repost);
  }

  /*Method returns al the posts liked by user and paginated by 10 in descending order*/
  @Override
  public List<RepostDtoResponse> getAllRepostsByUserId(Integer userId, Integer page) {
    Pageable pagedByTenPosts =
        PageRequest.of(page, 10);
    List<Repost> repostList = repostRepository.findAllByUserId(userId, pagedByTenPosts);
    return repostList.stream()
        .map(this::from)
        .toList();
  }


}
