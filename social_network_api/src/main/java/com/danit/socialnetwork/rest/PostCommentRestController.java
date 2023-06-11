package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.post.PostCommentDtoResponse;
import com.danit.socialnetwork.dto.post.PostCommentDtoSave;
import com.danit.socialnetwork.model.PostComment;
import com.danit.socialnetwork.service.PostCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostCommentRestController {

  private final PostCommentService postCommentService;

  @PostMapping(path = "/comments")
  public ResponseEntity<PostCommentDtoResponse> addPostComment(@Valid @RequestBody PostCommentDtoSave postCommentDto) {
    PostComment postComment = postCommentService.savePostComment(postCommentDto);
    return new ResponseEntity<>(PostCommentDtoResponse.from(postComment), HttpStatus.CREATED);
  }

  @GetMapping("/comments")
  public List<PostCommentDtoResponse> getAllComments(@RequestParam(name = "postId",
      defaultValue = "0") Integer postId, @RequestParam(name = "page", defaultValue = "0") Integer page) {
    if (postId == 0) {
      return new ArrayList<>();
    }

    return postCommentService.getAllPostCommentsByPostId(postId, page)
        .stream()
        .map(PostCommentDtoResponse::from)
        .toList();

  }

}

