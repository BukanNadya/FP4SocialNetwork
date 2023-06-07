package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.UserDobChangeRequest;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
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

  boolean activateUser(Integer code);

  boolean save(DbUser dbUser);

  boolean sendLetter(String name, String email);

  List<SearchDto> filterCachedUsersByName(SearchRequest request);

  UserDtoResponse findByUserId(Integer userId);

  boolean update(EditingDtoRequest request);

  ResponseEntity<Map<String, String>> dbUserDobChange(@RequestBody UserDobChangeRequest userDobChangeRequest);

  List<DbUser> getUsersWhoLikedPostByPostId(Integer postId, Integer page);

  List<DbUser> getUsersWhoMostPopular(Integer page);
}
