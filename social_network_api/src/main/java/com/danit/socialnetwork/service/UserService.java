package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.DbUser;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {

  byte[] getProfileImage(String username) throws IOException;

  byte[] getBackgroundImage(String username) throws IOException;

  Optional<DbUser> findByUsername(String username) throws IOException;

  Optional<DbUser> findById(Integer userId) throws IOException;

  Optional<DbUser> findDbUserByEmail(String email) throws IOException;

  public boolean activateUser(Integer code);

  boolean save(DbUser dbUser);

  boolean sendLetter(String name, String email);

  List<DbUser> filterCachedUsersByName(String userSearch);
}
