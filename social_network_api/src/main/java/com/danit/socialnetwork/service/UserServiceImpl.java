package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.Random;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder enc;
  private final MailSenderImpl mailSender;
  private final GuavaCache guavaCache;

  @Override
  public Optional<DbUser> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public byte[] getProfileImage(String username) throws IOException {
    String profileImagePath = userRepository.findByUsername(username).get().getProfileImageUrl();
    InputStream in = getClass().getResourceAsStream(profileImagePath);
    return FileCopyUtils.copyToByteArray(in);
  }

  @Override
  public byte[] getBackgroundImage(String username) throws IOException {
    String profileBackgroundImagePath = userRepository.findByUsername(username).get().getProfileBackgroundImageUrl();
    InputStream in = getClass().getResourceAsStream(profileBackgroundImagePath);
    return FileCopyUtils.copyToByteArray(in);
  }

  public boolean save(DbUser dbUser) {
    Optional<DbUser> userFromDb = userRepository.findByUsername(dbUser.getUsername());

    if (userFromDb.isPresent()) {
      log.info("User exists!");
      return false;
    }

    dbUser.setPassword(enc.encode(dbUser.getPassword()));
    userRepository.save(dbUser);
    log.info(String.format("save user name = %s, email = %s",
        dbUser.getName(), dbUser.getEmail()));
    return true;
  }

  @Override
  public boolean sendLetter(String name, String email) {

    Random rand = new Random();
    int randomNumber = rand.nextInt(900000) + 100000;

    guavaCache.put("activationCode", randomNumber);

    try {
      String message = String.format(
          "Hello, %s! \n "
              + "Welcome to BlitzPost. Email confirmation code %s",
          name, randomNumber);
      log.info(String.format(message));
      mailSender.send(email, "Activation code", message);
      log.info(String.format("mail Send to user name = %s, email = %s ", name, email));
    } catch (Exception e) {
      return false;
    }
    return true;
  }

  public boolean activateUser(Integer code) {
    Integer activationCode = guavaCache.getUnchecked("activationCode");
    if (activationCode == null) {
      return false;
    }

    return code.equals(activationCode);
  }

}
