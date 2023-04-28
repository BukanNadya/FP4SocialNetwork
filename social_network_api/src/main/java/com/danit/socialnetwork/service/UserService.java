package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.DbUser;

import java.io.IOException;

public interface UserService {
  DbUser findByUsername(String username);

  byte[] getProfileImage(String username) throws IOException;

  byte[] getBackgroundImage(String username) throws IOException;
}
