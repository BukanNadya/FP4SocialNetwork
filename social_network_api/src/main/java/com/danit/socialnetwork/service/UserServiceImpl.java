package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public DbUser findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public byte[] getProfileImage(String username) throws IOException {
    String profileImagePath = userRepository.findByUsername(username).getProfileImageUrl();
    InputStream in = getClass().getResourceAsStream(profileImagePath);
    return FileCopyUtils.copyToByteArray(in);
  }

  @Override
  public byte[] getBackgroundImage(String username) throws IOException {
    String profileBackgroundImagePath = userRepository.findByUsername(username).getProfileBackgroundImageUrl();
    InputStream in = getClass().getResourceAsStream(profileBackgroundImagePath);
    return FileCopyUtils.copyToByteArray(in);
  }

}
