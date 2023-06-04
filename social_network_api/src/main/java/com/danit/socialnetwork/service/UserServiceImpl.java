package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.config.ImageHandlingConf;
import com.danit.socialnetwork.dto.UserDobChangeRequest;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.exception.user.PhotoNotFoundException;
import com.danit.socialnetwork.exception.user.HeaderPhotoNotFoundException;
import com.danit.socialnetwork.mappers.SearchMapper;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import static com.danit.socialnetwork.config.GuavaCache.activateCodeCache;
import static com.danit.socialnetwork.config.GuavaCache.userCache;


@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final SearchMapper searchMapper;
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
      throw new PhotoNotFoundException(String.format("Photo for user with username %s is absent", username));
    } else {
      InputStream in = getClass().getResourceAsStream(profileImagePath);
      if (isEmpty(in)) {
        throw new PhotoNotFoundException(String.format("Wrong path to photo for user with username %s.", username));
      }
      return FileCopyUtils.copyToByteArray(in);
    }
  }

  @Override
  public byte[] getBackgroundImage(String username) throws IOException {
    String profileBackgroundImagePath = userRepository.findByUsername(username).get().getProfileBackgroundImageUrl();
    if (isEmpty(profileBackgroundImagePath)) {
      throw new HeaderPhotoNotFoundException(String.format("Header photo for user with username %S is absent.", username));
    } else {
      InputStream in = getClass().getResourceAsStream(profileBackgroundImagePath);
      if (isEmpty(in)) {

        throw new HeaderPhotoNotFoundException(String.format(
            "Wrong path to header photo for user with username %s.", username));
      }
      return FileCopyUtils.copyToByteArray(in);
    }
  }

  public boolean save(DbUser dbUser) {
    Optional<DbUser> userFromDbByUsername = userRepository.findByUsername(dbUser.getUsername());

    if (userFromDbByUsername.isPresent()) {
      log.info("User exists!");
      return false;
    }

    Optional<DbUser> userFromDbByEmail = userRepository.findDbUserByEmail(dbUser.getEmail());

    if (userFromDbByEmail.isPresent()) {
      log.info("User exists!");
      return false;
    }

    String hashedPassword = enc.encode(dbUser.getPassword());
    dbUser.setPassword(hashedPassword);
    userRepository.save(dbUser);
    log.info(String.format("save user name = %s, email = %s", dbUser.getName(), dbUser.getEmail()));
    return true;
  }

  @Override
  public boolean sendLetter(String name, String email) {

    Random rand = new Random();
    int randomNumber = rand.nextInt(900000) + 100000;

    activateCodeCache.put("activationCode", randomNumber);

    try {

      String message = String.format("Hello, %s! Welcome to Capitweet. Email confirmation code %s", name, randomNumber);
      log.debug(message);
      mailSender.send(email, "Activation code", message);
      log.debug(String.format("mail send to user %s.", name));
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

  public List<SearchDto> filterCachedUsersByName(SearchRequest request) {
    Integer userId = Integer.valueOf(request.getUserId());
    String userSearch = request.getSearch();
    if (userCache.getIfPresent("UserCache") == null) {
      List<DbUser> cacheUsers = userRepository.findAll();
      userCache.put("UserCache", cacheUsers);
    }
    log.debug(String.format("filterCachedUsersByName: %s. Should find all users by name.", userSearch));
    return userCache.getIfPresent("UserCache").stream()
        .filter(user -> (user.getName().toLowerCase()
            .contains(userSearch.toLowerCase())
            && !user.getUserId().equals(userId))
            || user.getUsername().toLowerCase()
            .contains(userSearch.toLowerCase())
            && !user.getUserId().equals(userId))
        .map(searchMapper::dbUserToSearchDto).toList();
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
      throw new UserNotFoundException(String.format("User with e-mail %s not found.", email));
    }
    return maybeUser;
  }

  @Override
  public boolean update(EditingDtoRequest request) {
    Integer userId = request.getUserId();
    int day = request.getDay();
    int month = request.getMonth();
    int year = request.getYear();
    LocalDate dateOfBirth = LocalDate.of(year, month, day);
    Optional<DbUser> userFromDb = userRepository.findById(userId);
    if (userFromDb.isEmpty()) {
      log.debug(String.format("User with id %d not found.", userId));
      return false;
    } else {
      DbUser updateUser = userFromDb.get();
      updateUser.setName(request.getName());
      updateUser.setDateOfBirth(dateOfBirth);
      updateUser.setAddress(request.getAddress());

      ImageHandlingConf imageHandling = new ImageHandlingConf();
      byte[] profileImage = request.getProfileImageUrl();
      updateUser.setProfileImageUrl(imageHandling.uploadImage(profileImage, "production"));
      byte[] profileBackgroundImage = request.getProfileBackgroundImageUrl();
      updateUser.setProfileBackgroundImageUrl(imageHandling
          .uploadImage(profileBackgroundImage, "production"));

      userRepository.save(updateUser);
      log.debug(String.format("save user id = %s", userId));
      return true;
    }
  }

  @Override
  public ResponseEntity<Map<String, String>> dbUserDobChange(
      @RequestBody UserDobChangeRequest userDobChangeRequest) {
    Optional<DbUser> maybeUser = userRepository.findById(userDobChangeRequest.getUserId());
    Map<String, String> response = new HashMap<>();
    response.put("userId", userDobChangeRequest.getUserId().toString());
    if (maybeUser.isPresent()) {
      LocalDate newDob = LocalDate.of(
          userDobChangeRequest.getYear(),
          userDobChangeRequest.getMonth(),
          userDobChangeRequest.getDay());
      DbUser user = maybeUser.get();
      user.setDateOfBirth(newDob);
      userRepository.save(user);
      response.put("message", "User birthday changed");
      return new ResponseEntity<>(response, HttpStatus.OK);
    } else {
      response.put("message", "invalid User id");
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
  }

  @Override
  public List<DbUser> getUsersWhoLikedPostByPostId(Integer postId, Integer page) {
    int pageSize = 10;
    Pageable pagedByPageSizePosts = PageRequest.of(page, pageSize);
    return userRepository.getUsersWhoLikedPostByPostId(postId, pagedByPageSizePosts);
  }

  @Override
  public List<DbUser> getUsersWhoMostPopular(Integer page) {
    int pageSize = 10;
    Pageable pagedByPageSizePosts = PageRequest.of(page, pageSize);
    return userRepository.findAllWhoMostPopular(pagedByPageSizePosts) ;
  }
}
