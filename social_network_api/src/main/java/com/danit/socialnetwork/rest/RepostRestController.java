package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.RepostDtoResponse;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.model.Repost;
import com.danit.socialnetwork.service.RepostService;
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
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RepostRestController {

  private final RepostService repostService;

  /*Method save a repost*/
  @PostMapping(path = "/reposts")
  public ResponseEntity<RepostDtoSave> addRepost(@Valid @RequestBody RepostDtoSave theRepostDto) {
    Repost repost = repostService.saveRepost(theRepostDto);
    return new ResponseEntity<>(RepostDtoSave.from(repost), HttpStatus.CREATED);
  }

  /*Method returns all reposts done by user*/
  @GetMapping("/reposts")
  public List<RepostDtoResponse> getAllRepostsByUserId(@RequestParam(name = "userId", defaultValue = "0")
                                                       Integer userId,
                                                       @RequestParam(name = "page", defaultValue = "0")
                                                       Integer page) {
    if (userId == 0) {
      return new ArrayList<>();
    }
    return repostService.getAllRepostsByUserId(userId, page);

  }

  @DeleteMapping("/reposts")
  public ResponseEntity<RepostDtoSave> deleteRepost(@RequestParam(name = "postId")
                                                    @Positive @NotEmpty Integer postId,
                                                    @RequestParam(name = "userId")
                                                    @Positive @NotEmpty Integer userId) {
    Repost repost = repostService.deleteRepost(postId, userId);
    return new ResponseEntity<>(RepostDtoSave.from(repost), HttpStatus.OK);
  }


  @GetMapping("/reposts/active")
  public Boolean isActiveRepost(@RequestParam(name = "postId") Integer postId,
                                @RequestParam(name = "userId") Integer userId) {
    return repostService.isActiveRepost(postId, userId);
  }


}
