package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.ActivateCodeRequest;
import com.danit.socialnetwork.dto.RegistrationRequest;
import com.danit.socialnetwork.dto.UserDobChangeRequest;
import com.danit.socialnetwork.dto.UserEmailForLoginRequest;
import com.danit.socialnetwork.dto.UserEmailRequest;
import com.danit.socialnetwork.dto.user.UserDtoForPostLikeResponse;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.dto.user.UserDtoForSidebar;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.io.IOException;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserRestController {
  private final UserService userService;

  /*The method saves a new user*/
  @PostMapping(path = "/registration")
  public ResponseEntity<Map<String, String>> handleRegistrationPost(
      @RequestBody RegistrationRequest request) {
    ResponseEntity<Map<String, String>> responseEntity = userService.save(request);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  /*The method finds a user by email*/
  @PostMapping(value = "/checkEmail")
  public ResponseEntity<Map<String, String>> handleCheckEmailPost(
      @RequestBody UserEmailForLoginRequest request) throws IOException {
    ResponseEntity<Map<String, String>> responseEntity = userService.findDbUserByEmail(request);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  /*The method sends an email to the new user with a code to confirm his mail*/
  @PostMapping(value = "/sendLetter")
  public ResponseEntity<Map<String, String>> handleSendLetterPost(
      @RequestBody UserEmailRequest request) {
    ResponseEntity<Map<String, String>> responseEntity = userService.sendLetter(request);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  /*The method checks the code entered by the user against the code from the cache*/
  @PostMapping(value = "/activate")
  public ResponseEntity<Map<String, String>> handleActivatePost(
      @RequestBody ActivateCodeRequest request) {
    ResponseEntity<Map<String, String>> responseEntity = userService.activateUser(request);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  /*The method finds all users by name or username that matches the string
 entered in the form*/
  @PostMapping(value = "/search")
  public ResponseEntity<List<SearchDto>> handleSearchPost(@RequestBody SearchRequest request) {
    List<SearchDto> searchDto = userService.filterCachedUsersByName(request);
    log.debug(String.format("filterCachedUsersByName: %s. Find all users by name.",
        request.getSearch()));
    return new ResponseEntity<>(searchDto, HttpStatus.FOUND);
  }

  /*The method saves changes to the existing user made by the user in the form*/
  @PutMapping(value = "/edition")
  public ResponseEntity<Map<String, String>> handleEditionPost(
      @RequestBody EditingDtoRequest request) {
    Map<String, String> response = new HashMap<>();
    ResponseEntity<Map<String, String>> responseEntity = userService.update(request);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @GetMapping("/profile/{userId}")
  public ResponseEntity<UserDtoResponse> getUserById(@PathVariable("userId") Integer userId) {
    UserDtoResponse tempUser = userService.findByUserId(userId);
    return new ResponseEntity<>(tempUser, HttpStatus.OK);
  }

  @PostMapping("/change_dob")
  public ResponseEntity<Map<String, String>> dbUserDobChange(
      @RequestBody UserDobChangeRequest userDobChangeRequest) {
    return userService.dbUserDobChange(userDobChangeRequest);
  }

  @GetMapping("/users/likes")
  public List<UserDtoForPostLikeResponse> getUsersWhoLikedPostByPostId(@RequestParam(name = "postId",
      defaultValue = "0") Integer postId, @RequestParam(name = "page", defaultValue = "0") Integer page) {
    if (postId == 0) {
      return new ArrayList<>();
    }
    return userService.getUsersWhoLikedPostByPostId(postId, page)
        .stream()
        .map(UserDtoForPostLikeResponse::from)
        .toList();
  }


  @GetMapping("/users/popular")
  public List<UserDtoForSidebar> getUsersWhoMostPopular(@RequestParam(name = "page", defaultValue = "0") Integer page) {
    return userService.getUsersWhoMostPopular(page)
        .stream()
        .map(UserDtoForSidebar::from)
        .toList();
  }


}