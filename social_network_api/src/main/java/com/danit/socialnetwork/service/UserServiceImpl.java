package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.config.ImageHandlingConf;
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
import com.danit.socialnetwork.exception.user.UserNotFoundException;
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
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
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
  private final ImageHandlingConf imageHandlingConf;
  private static final String FALSE = "false";
  private static final String TRUE = "true";

  /*The method finds a user by username and returns it*/
  @Override
  public Optional<DbUser> findByUsername(String username) {
    Optional<DbUser> maybeUser = userRepository.findByUsername(username);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with username %s not found", username));
    }
    return maybeUser;
  }

  /*The method finds a user by id and returns it*/
  @Override
  public Optional<DbUser> findById(Integer userId) {
    Optional<DbUser> maybeUser = userRepository.findById(userId);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with userId %s not found", userId));
    }
    return maybeUser;
  }

  /*The method saves a new user if there is no such user in the database*/
  @Override
  public ResponseEntity<Map<String, String>> save(RegistrationRequest request) {
    int day = request.getDay();
    int month = request.getMonth();
    int year = request.getYear();
    LocalDate dateOfBirth = LocalDate.of(year, month, day);
    DbUser dbUser = new DbUser();
    dbUser.setUsername(request.getUsername());
    dbUser.setPassword(request.getPassword());
    dbUser.setEmail(request.getEmail());
    dbUser.setName(request.getName());
    dbUser.setDateOfBirth(dateOfBirth);
    Map<String, String> response = new HashMap<>();
    Optional<DbUser> userFromDbByUsername = userRepository.findByUsername(dbUser.getUsername());
    if (userFromDbByUsername.isPresent()) {
      log.info("User exists!");
      response.put("registration", FALSE);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    Optional<DbUser> userFromDbByEmail = userRepository.findDbUserByEmail(dbUser.getEmail());
    if (userFromDbByEmail.isPresent()) {
      log.info("User exists!");
      response.put("registration", FALSE);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    String hashedPassword = enc.encode(dbUser.getPassword());
    dbUser.setPassword(hashedPassword);
    userRepository.save(dbUser);
    log.info(String.format("save user name = %s, email = %s", dbUser.getName(), dbUser.getEmail()));
    response.put("registration", TRUE);
    return ResponseEntity.ok(response);
  }

  /*The method sends an email to the new user with a code to confirm his mail*/
  @Override
  public ResponseEntity<Map<String, String>> sendLetter(UserEmailRequest request) {
    String name = request.getName();
    String email = request.getEmail();
    Random rand = new Random();
    int randomNumber = rand.nextInt(900000) + 100000;
    activateCodeCache.put("activationCode", randomNumber);
    Map<String, String> response = new HashMap<>();
    try {
      String message = String.format("Hello, %s! Welcome to Capitweet. Email confirmation code %s", name, randomNumber);
      log.debug(message);
      mailSender.send(email, "Activation code", message);
      log.debug(String.format("mail send to user %s.", name));
    } catch (Exception e) {
      response.put("sendLetter", FALSE);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    response.put("sendLetter", TRUE);
    return ResponseEntity.ok(response);
  }

  /*The method checks the code entered by the user against the code from the cache*/
  public ResponseEntity<Map<String, String>> activateUser(ActivateCodeRequest request) {
    Integer code = request.getCode();
    Integer activationCode = activateCodeCache.getIfPresent("activationCode");
    Map<String, String> response = new HashMap<>();
    if (activationCode == null || !activationCode.equals(code)) {
      response.put("activate", FALSE);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    response.put("activate", TRUE);
    return ResponseEntity.ok(response);
  }

  /*The method finds all users by name or username that matches the string
   entered in the form and returns them*/
  @Override
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

  /*The method finds a user by id and returns it*/
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

  /*The method finds a user by email and returns it*/
  //  @Override
  public Optional<DbUser> findDbUserByEmail(String email) {
    Optional<DbUser> maybeUser = userRepository.findDbUserByEmail(email);
    if (maybeUser.isEmpty()) {
      throw new UserNotFoundException(String.format("User with e-mail %s not found.", email));
    }
    return maybeUser;
  }

  /*The method finds a user by email and returns it*/
  @Override
  public ResponseEntity<Map<String, String>> findDbUserByEmail(UserEmailForLoginRequest request) {
    String email = request.getEmail();
    Optional<DbUser> maybeUser = userRepository.findDbUserByEmail(email);
    Map<String, String> response = new HashMap<>();
    if (maybeUser.isEmpty()) {
      response.put("checkEmail", FALSE);
      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    response.put("checkEmail", TRUE);
    return new ResponseEntity<>(response, HttpStatus.FOUND);
  }

  /*The method saves changes to the existing user made by the user in the form*/
  @Override
  public ResponseEntity<Map<String, String>> update(EditingDtoRequest request) {
    Integer userId = request.getUserId();
    int day = request.getDay();
    int month = request.getMonth();
    int year = request.getYear();
    LocalDate dateOfBirth = LocalDate.of(year, month, day);
    Optional<DbUser> userFromDb = userRepository.findById(userId);
    Map<String, String> response = new HashMap<>();
    if (userFromDb.isEmpty()) {
      log.debug(String.format("User with id %d not found.", userId));
      response.put("edition", FALSE);
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } else {
      DbUser updateUser = userFromDb.get();
      updateUser.setName(request.getName());
      updateUser.setDateOfBirth(dateOfBirth);
      updateUser.setAddress(request.getAddress());
      byte[] profileImage = request.getProfileImageUrl();
      byte[] profileBackgroundImage = request.getProfileBackgroundImageUrl();
      String profileImageString = request.getProfileImageUrlString();
      String profileBackgroundImageString = request.getProfileBackgroundImageUrlString();
      if (profileImage != null && profileImage.length != 0) {
        updateUser.setProfileImageUrl(imageHandlingConf
            .uploadImage(profileImage, "production"));
      } else if (profileImage == null && profileImageString == null) {
        updateUser.setProfileImageUrl(null);
      }
      if (profileBackgroundImage != null && profileBackgroundImage.length != 0) {
        updateUser.setProfileBackgroundImageUrl(imageHandlingConf
            .uploadImage(profileBackgroundImage, "production"));
      } else if ((profileBackgroundImage == null && profileBackgroundImageString == null)
          || (profileBackgroundImage != null && profileBackgroundImage.length == 0)) {
        updateUser.setProfileBackgroundImageUrl(null);
      }
      userRepository.save(updateUser);
      log.debug(String.format("save user id = %s", userId));
      response.put("edition", TRUE);
      return ResponseEntity.ok(response);
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
  public List<UserDtoForSidebar> getUsersWhoMostPopularWithFollowers(Integer userId, Integer pageNumber) {
    int pageSize = 10;
    int offset = pageNumber * pageSize;
    List<Object[]> results = userRepository.findAllWhoMostPopularWithFollowers(userId, offset, pageSize);
    return results.stream()
        .map(UserDtoForSidebar::from)
        .toList();
  }
}
