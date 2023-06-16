package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.PostLikeDto;
import com.danit.socialnetwork.model.PostLike;
import com.danit.socialnetwork.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostLikeRestController {

  private final PostLikeService postLikeService;

  @PostMapping(path = "/likes")
  public ResponseEntity<PostLikeDto> addPostLike(@Valid @RequestBody PostLikeDto thePostLikeDto) {
    PostLike postLike = postLikeService.savePostLike(thePostLikeDto);
    return new ResponseEntity<>(PostLikeDto.from(postLike), HttpStatus.CREATED);
  }


  @GetMapping("/likes")
  public Integer getCountAllLikesByPostId(@RequestParam(name = "postId",
      defaultValue = "0") @Positive Integer postId) {
    if (postId == 0) {
      return 0;
    }
    return postLikeService.getCountAllLikesByPostId(postId);
  }


  @GetMapping("/likes/active")
  public Boolean isExistPostLike(@RequestParam(name = "postId") Integer postId,
                                 @RequestParam(name = "userId") Integer userId) {
    return postLikeService.isPresentPostLike(postId, userId);
  }

  @DeleteMapping("/likes")
  public ResponseEntity<PostLikeDto> deletePostLike(@RequestParam(name = "postId")
                                                    @Positive @NotEmpty Integer postId,
                                                    @RequestParam(name = "userId")
                                                    @Positive @NotEmpty Integer userId) {
    PostLike postLike = postLikeService.deletePostLike(postId, userId);
    return new ResponseEntity<>(PostLikeDto.from(postLike), HttpStatus.OK);
  }


}
