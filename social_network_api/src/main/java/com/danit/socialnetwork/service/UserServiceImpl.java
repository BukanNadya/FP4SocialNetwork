package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.exception.user.PhotoNotFoundException;
import com.danit.socialnetwork.exception.user.HeaderPhotoNotFoundException;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static com.danit.socialnetwork.config.GuavaCache.activateCodeCache;
import static com.danit.socialnetwork.config.GuavaCache.userCache;


@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder enc;
  private final MailSenderImpl mailSender;
  private final GuavaCache guavaCache;
  private final UserFollowRepository userFollowRepository;

  private <T extends Object> Boolean isEmpty(T temp) {
    return Optional.ofNullable(temp).isEmpty();
  }

  @Override
  public Optional<DbUser> findByUsername(String username) {
    Optional<DbUser> maybeUser = userRepository.findByUsername(username);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with username %s not found", username));
    }
    return maybeUser;
  }

  @Override
  public Optional<DbUser> findById(Integer userId) {
    Optional<DbUser> maybeUser = userRepository.findById(userId);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with userId %s not found", userId));
    }
    return maybeUser;
  }

  @Override
  public byte[] getProfileImage(String username) throws IOException {
    String profileImagePath = userRepository.findByUsername(username).get().getProfileImageUrl();
    if (isEmpty(profileImagePath)) {
      throw new PhotoNotFoundException("Photo for user with username " + username + " is absent");
    } else {
      InputStream in = getClass().getResourceAsStream(profileImagePath);
      if (isEmpty(in)) {
        throw new PhotoNotFoundException("Wrong path to photo for user with username " + username);
      }
      return FileCopyUtils.copyToByteArray(in);

    }
  }

  @Override
  public byte[] getBackgroundImage(String username) throws IOException {
    String profileBackgroundImagePath = userRepository.findByUsername(username).get().getProfileBackgroundImageUrl();
    if (isEmpty(profileBackgroundImagePath)) {
      throw new HeaderPhotoNotFoundException("Header photo for user with username " + username + " is absent");
    } else {
      InputStream in = getClass().getResourceAsStream(profileBackgroundImagePath);
      if (isEmpty(in)) {
        throw new HeaderPhotoNotFoundException("Wrong path to header photo for user with username " + username);
      }
      return FileCopyUtils.copyToByteArray(in);
    }
  }

  public boolean save(DbUser dbUser) {
    Optional<DbUser> userFromDb = userRepository.findByUsername(dbUser.getUsername());

    if (userFromDb.isPresent()) {
      log.info("User exists!");
      return false;
    }

    String hashedPassword = enc.encode(dbUser.getPassword());
    dbUser.setPassword(hashedPassword);
    userRepository.save(dbUser);
    log.info(String.format("save user name = %s, email = %s",
        dbUser.getName(), dbUser.getEmail()));
    return true;
  }

  @Override
  public boolean sendLetter(String name, String email) {

    Random rand = new Random();
    int randomNumber = rand.nextInt(900000) + 100000;

    activateCodeCache.put("activationCode", randomNumber);

    try {
      String message = String.format(
          "Hello, %s! \n "
              + "Welcome to Capitweet. Email confirmation code %s",
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
    Integer activationCode = activateCodeCache.getIfPresent("activationCode");
    if (activationCode == null) {
      return false;
    }
    return code.equals(activationCode);
  }

  public List<DbUser> filterCachedUsersByName(String userSearch) {
    if (userCache.getIfPresent("UserCache") == null) {
      List<DbUser> cacheUsers = userRepository.findAll();
      userCache.put("UserCache", cacheUsers);
    }
    log.debug("filterCachedUsersByName: " + userSearch + ". Should find all users by name.");
    return userCache.getIfPresent("UserCache").stream()
        .filter(user -> user.getName().toLowerCase()
            .contains(userSearch.toLowerCase()))
        .toList();
  }

  @Override
  public UserDtoResponse findByUserId(Integer userId) {
    Optional<DbUser> maybeUser = userRepository.findById(userId);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with userId %s not found", userId));
    }
    UserDtoResponse userDtoResponse = UserDtoResponse.from(maybeUser.get());
    userDtoResponse.setFollowers(userFollowRepository.findAllFollowers(userId));
    userDtoResponse.setFollowings(userFollowRepository.findAllFollowings(userId));
    return userDtoResponse;
  }

  //  @Override
  public Optional<DbUser> findDbUserByEmail(String email) {
    Optional<DbUser> maybeUser = userRepository.findDbUserByEmail(email);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException("User with e-mail " + email + " not found");
    }
    return maybeUser;
  }

}
