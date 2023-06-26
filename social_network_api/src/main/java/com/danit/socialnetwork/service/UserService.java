package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.UserEmailForLoginRequest;
import com.danit.socialnetwork.dto.UserEmailRequest;
import com.danit.socialnetwork.dto.user.RegistrationRequest;
import com.danit.socialnetwork.dto.ActivateCodeRequest;
import com.danit.socialnetwork.dto.UserDobChangeRequest;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.dto.user.UserDtoForSidebar;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {

  Optional<DbUser> findByUsername(String username) throws IOException;

  Optional<DbUser> findById(Integer userId) throws IOException;

  Optional<DbUser> findDbUserByEmail(String email) throws IOException;

  ResponseEntity<Map<String, String>> findDbUserByEmail(UserEmailForLoginRequest request) throws IOException;

  ResponseEntity<Map<String, String>> activateUser(ActivateCodeRequest request);

  ResponseEntity<Map<String, String>> save(RegistrationRequest request);

  ResponseEntity<Map<String, String>> sendLetter(UserEmailRequest request);

  List<SearchDto> filterCachedUsersByName(SearchRequest request);

  UserDtoResponse findByUserId(Integer userId);

  ResponseEntity<Map<String, String>> update(EditingDtoRequest request);

  ResponseEntity<Map<String, String>> dbUserDobChange(@RequestBody UserDobChangeRequest userDobChangeRequest);

  List<DbUser> getUsersWhoLikedPostByPostId(Integer postId, Integer page);

  List<UserDtoForSidebar> getUsersWhoMostPopularWithFollowers(Integer userId, Integer page);

  DbUser findDbUserByUserId(Integer userId);

  void saveUser(DbUser user);
}
