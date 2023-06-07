package com.danit.socialnetwork.service;

import com.danit.socialnetwork.config.ImageHandlingConf;
import com.danit.socialnetwork.dto.UserDobChangeRequest;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.mappers.SearchMapper;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserFollowRepository;
import com.danit.socialnetwork.repository.UserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.danit.socialnetwork.config.GuavaCache;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static com.danit.socialnetwork.config.GuavaCache.activateCodeCache;
import static com.danit.socialnetwork.config.GuavaCache.userCache;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
  @InjectMocks
  UserServiceImpl userServiceImp;
  @Mock
  UserRepository userRepository;
  @Mock
  UserFollowRepository userFollowRepository;
  @Mock
  PasswordEncoder passwordEncoder;
  @Mock
  MailSenderImpl mailSender;
  @Mock
  GuavaCache guavaCache;
  @Mock
  SearchDto searchDto;
  @Mock
  SearchMapper searchMapper;
  @Mock
  ImageHandlingConf imageHandlingConf;

  @Test
  void findByUsername_shouldFindUser_WhenExists() {
    DbUser testDbUser = new DbUser();
    testDbUser.setUsername("Nadya");

    when(userRepository.findByUsername("Nadya")).thenReturn(Optional.of(testDbUser));
    Optional<DbUser> testUser = userServiceImp.findByUsername("Nadya");

    Assert.assertEquals(Optional.of(testDbUser), testUser);
  }

  @Test
  public void findByUsername_shouldNotFindUser_WhenNotExists() {
    Optional<DbUser> testUser = userRepository.findByUsername("TestUser");

    Mockito.verify(userRepository).findByUsername("TestUser");


    Assert.assertEquals(Optional.empty(), testUser);
  }

  @Test
  void findById_shouldFindUser_WhenExists() {
    DbUser testDbUser = new DbUser();
    testDbUser.setUserId(28);

    when(userRepository.findById(28)).thenReturn(Optional.of(testDbUser));
    Optional<DbUser> testUser = userServiceImp.findById(28);

    Assert.assertEquals(Optional.of(testDbUser), testUser);
  }

  @Test
  void findById_shouldNotFindUser_WhenNotExists() {
    Optional<DbUser> testUser = userRepository.findById(10);

    Mockito.verify(userRepository).findById(10);

    Assert.assertEquals(Optional.empty(), testUser);
  }

  @Test
  void getProfileImage() {
  }

  @Test
  void getBackgroundImage() {
  }

  @Test
  void save_shouldSaveUser_WhenNotExists() {
    DbUser testUser = new DbUser();
    testUser.setUsername("testuser");
    testUser.setPassword("password");
    testUser.setName("Testuser");
    testUser.setEmail("testuser@example.com");
    testUser.setDateOfBirth(LocalDate.of(2000, 01, 01));

    when(userRepository.findByUsername(testUser.getUsername())).thenReturn(Optional.empty());
    when(userRepository.findDbUserByEmail(testUser.getEmail())).thenReturn(Optional.empty());
    when(passwordEncoder.encode(testUser.getPassword())).thenReturn("password");

    boolean result = userServiceImp.save(testUser);

    Mockito.verify(userRepository).save(testUser);
    Mockito.verify(passwordEncoder).encode(testUser.getPassword());

    assertTrue(result);
  }

  @Test
  void save_shouldNotSaveUser_WhenExists() {
    DbUser existingUser = new DbUser();
    existingUser.setUsername("Nadya");
    existingUser.setPassword("123");
    existingUser.setName("Nadya");
    existingUser.setEmail("Test@gmail.com");
    existingUser.setDateOfBirth(LocalDate.of(1999, 01, 27));

    when(userRepository.findByUsername(existingUser.getUsername())).thenReturn(Optional.of(existingUser));

    DbUser dbUser = new DbUser();
    dbUser.setUsername("Nadya");
    dbUser.setPassword("123");
    dbUser.setName("Nadya");
    dbUser.setEmail("Test@gmail.com");
    dbUser.setDateOfBirth(LocalDate.of(1999, 01, 27));

    boolean result = userServiceImp.save(dbUser);
    Mockito.verify(userRepository, never()).save(any(DbUser.class));

    assertFalse(result);
  }

  @Test
  void sendLetter() {
    String name = "Nadya";
    String email = "Test@gmail.com";

    boolean result = userServiceImp.sendLetter(name, email);

    assertTrue(result);
  }

  @Test
  void activateUser_WithValidActivationCode() {
    activateCodeCache.put("activationCode", 123456);

    assertTrue(userServiceImp.activateUser(123456));
  }

  @Test
  void activateUser_WithInvalidActivationCode() {
    activateCodeCache.put("activationCode", 123456);

    assertFalse(userServiceImp.activateUser(654321));
  }

  @Test
  void filterCachedUsersByName_WhenExists() {
    DbUser testDbUser1 = new DbUser();
    testDbUser1.setName("Nadya");
    testDbUser1.setUsername("NNN");
    testDbUser1.setUserId(1); // Set the userId property
    DbUser testDbUser2 = new DbUser();
    testDbUser2.setName("NNN");
    testDbUser2.setUsername("Nadin");
    testDbUser2.setUserId(2); // Set the userId property
    DbUser testDbUser3 = new DbUser();
    testDbUser3.setName("Ron");
    testDbUser3.setUsername("RRR");
    testDbUser3.setUserId(3); // Set the userId property
    DbUser testDbUser4 = new DbUser();
    testDbUser4.setName("DDD");
    testDbUser4.setUsername("Dima");
    testDbUser4.setUserId(4); // Set the userId property
    DbUser testDbUser5 = new DbUser();
    testDbUser5.setName("Roma");
    testDbUser5.setUsername("RRR");
    testDbUser5.setUserId(5); // Set the userId property

    List<DbUser> dbUsers = new ArrayList<>();
    dbUsers.add(testDbUser1);
    dbUsers.add(testDbUser2);
    dbUsers.add(testDbUser3);
    dbUsers.add(testDbUser4);
    dbUsers.add(testDbUser5);

    userCache.put("UserCache", dbUsers);

    SearchDto testSearchDto1 = new SearchDto();
    testSearchDto1.setName("Nadya");
    testSearchDto1.setUsername("NNN");
    SearchDto testSearchDto2 = new SearchDto();
    testSearchDto2.setName("NNN");
    testSearchDto2.setUsername("Nadin");

    List<SearchDto> testSearchDto = new ArrayList<>();
    testSearchDto.add(testSearchDto1);
    testSearchDto.add(testSearchDto2);

    String nameSearch = "nad";
    String userId = "3";
    SearchRequest search = new SearchRequest();
    search.setSearch(nameSearch);
    search.setUserId(userId);

    when(searchMapper.dbUserToSearchDto(testDbUser1)).thenReturn(testSearchDto1);
    when(searchMapper.dbUserToSearchDto(testDbUser2)).thenReturn(testSearchDto2);

    List<SearchDto> resultSearchDto = userServiceImp.filterCachedUsersByName(search);

    Assert.assertTrue(resultSearchDto.size() <= 5);
    Assert.assertEquals(2, resultSearchDto.size());
    Assert.assertTrue(resultSearchDto.get(0).getName().toUpperCase().contains("nad".toUpperCase())
        || resultSearchDto.get(0).getUsername().toUpperCase().contains("nad".toUpperCase()));
  }


  @Test
  void filterCachedUsersByName_WhenNotExists() {
    DbUser testDbUser = new DbUser();
    testDbUser.setName("Nadya");
    testDbUser.setUsername("Nadya");

    List<DbUser> dbUsers = new ArrayList<>();
    dbUsers.add(testDbUser);
    userCache.put("UserCache", dbUsers);

    String nameSearch = "nid";
    String userId = "2";
    SearchRequest search = new SearchRequest();
    search.setSearch(nameSearch);
    search.setUserId(userId);

    List<SearchDto> testByName = userServiceImp.filterCachedUsersByName(search);

    Assert.assertEquals(0, testByName.size());
    Assert.assertFalse(dbUsers.get(0).getName().toUpperCase().contains("nid".toUpperCase())
        || dbUsers.get(0).getUsername().toUpperCase().contains("nid".toUpperCase()));
  }

  @Test
  void findDbUserByEmail_shouldFindUser_WhenExists() {
    DbUser testDbUser = new DbUser();
    testDbUser.setEmail("Test@gmail.com");

    when(userRepository.findDbUserByEmail("Test@gmail.com")).thenReturn(Optional.of(testDbUser));
    Optional<DbUser> testUser = userServiceImp.findDbUserByEmail("Test@gmail.com");

    Assert.assertEquals(Optional.of(testDbUser), testUser);
  }

  @Test
  void findDbUserByEmail_shouldNotFindUser_WhenNotExists() {
    Optional<DbUser> testUser = userRepository.findDbUserByEmail("TestUser@gmail.com");

    Mockito.verify(userRepository).findDbUserByEmail("TestUser@gmail.com");

    Assert.assertEquals(Optional.empty(), testUser);
  }

  @Test
  void findByUserId() {
    Integer userId = 3;
    Integer followers = 3;
    Integer followings = 1;

    DbUser dbUser = new DbUser();
    dbUser.setUserId(userId);
    dbUser.setUsername("John1");
    dbUser.setName("Johny1");
    dbUser.setCreatedDate(LocalDateTime.now());

    when(userRepository.findById(userId)).thenReturn(Optional.of(dbUser));
    when(userFollowRepository.findAllFollowers(userId)).thenReturn(followers);
    when(userFollowRepository.findAllFollowings(userId)).thenReturn(followings);

    UserDtoResponse result = userServiceImp.findByUserId(userId);

    Assertions.assertEquals(followers, result.getFollowers());
    Assertions.assertEquals(followings, result.getFollowings());
    Assertions.assertEquals("John1", result.getUsername());
    Assertions.assertEquals("Johny1", result.getName());

  }

  @Test
  void update_shouldUpdateUser_WhenExists() {
    DbUser testUser = new DbUser();
    testUser.setUserId(1);
    testUser.setUsername("TestUser");
    testUser.setPassword("123");
    testUser.setEmail("Testuser@gmail.com");
    testUser.setCreatedDate(LocalDateTime.of(2023, 5, 25, 0, 0));
    testUser.setName("TestUser");
    testUser.setDateOfBirth(LocalDate.of(2000, 01, 01));
    testUser.setAddress(null);
    testUser.setProfileImageUrl("https://klike.net/uploads/posts/2022-06/1655707539_1.jpg");
    testUser.setProfileBackgroundImageUrl("https://klike.net/uploads/posts/2022-06/1655707539_1.jpg");

    DbUser testUpdateUser = new DbUser();
    testUpdateUser.setUserId(1);
    testUpdateUser.setUsername("TestUser");
    testUpdateUser.setPassword("123");
    testUpdateUser.setEmail("Testuser@gmail.com");
    testUpdateUser.setCreatedDate(LocalDateTime.of(2023, 5, 25, 0, 0));
    testUpdateUser.setName("TestUpdateUser");
    testUpdateUser.setDateOfBirth(LocalDate.of(2010, 10, 10));
    testUpdateUser.setAddress("XXX");
    testUpdateUser.setProfileImageUrl(null);
    testUpdateUser.setProfileBackgroundImageUrl(null);

    EditingDtoRequest request = new EditingDtoRequest();
    request.setUserId(1);
    request.setName("TestUpdateUser");
    request.setDay(10);
    request.setMonth(10);
    request.setYear(2010);
    request.setAddress("XXX");
    request.setProfileImageUrl(null);
    request.setProfileBackgroundImageUrl(null);

    when(userRepository.findById(1)).thenReturn(Optional.of(testUser));

    boolean result = userServiceImp.update(request);

    assertEquals(testUpdateUser.getName(), testUser.getName());
    assertEquals(testUpdateUser.getDateOfBirth(), testUser.getDateOfBirth());
    assertEquals(testUpdateUser.getAddress(), testUser.getAddress());
    assertEquals(testUpdateUser.getProfileImageUrl(), testUser.getProfileImageUrl());
    assertEquals(testUpdateUser.getProfileBackgroundImageUrl(), testUser.getProfileBackgroundImageUrl());
    assertTrue(result);
  }


  @Test
  void dbUserDobChange() {
    UserDobChangeRequest userDobChangeRequest = new UserDobChangeRequest();
    userDobChangeRequest.setUserId(55);
    userDobChangeRequest.setDay(1);
    userDobChangeRequest.setMonth(11);
    userDobChangeRequest.setYear(2000);
    DbUser user = new DbUser();
    user.setUserId(55);
    user.setDateOfBirth(LocalDate.of(1995, 12, 10));
    when(userRepository.findById(55)).thenReturn(Optional.of(user));

    ResponseEntity<Map<String, String>> mapResponseEntity = userServiceImp.dbUserDobChange(userDobChangeRequest);
    assertEquals("{message=User birthday changed, userId=55}", mapResponseEntity.getBody().toString());
  }

  @Test
  void getUsersWhoLikedPostByPostId() {
    DbUser dbUser1 = new DbUser();
    dbUser1.setUserId(1);
    dbUser1.setUsername("John");
    dbUser1.setName("Johny");
    DbUser dbUser2 = new DbUser();
    dbUser2.setUserId(2);
    dbUser2.setUsername("Jim");
    dbUser2.setName("Jimmy");
    List<DbUser> dbUserList = Arrays.asList(dbUser1, dbUser2);

    int pageSize = 10;
    Pageable pagedByPageSizePosts = PageRequest.of(0, pageSize);
    when(userRepository.getUsersWhoLikedPostByPostId(1, pagedByPageSizePosts)).thenReturn(dbUserList);

    List<DbUser> userList = userServiceImp.getUsersWhoLikedPostByPostId(1, 0);

    Assertions.assertEquals(2, userList.size());
    Assertions.assertEquals(1, userList.get(0).getUserId());
    Assertions.assertEquals("John", userList.get(0).getUsername());
    Assertions.assertEquals("Johny", userList.get(0).getName());

  }

  @Test
  void getUsersWhoMostPopular() {
    DbUser dbUser1 = new DbUser();
    dbUser1.setUserId(1);
    dbUser1.setUsername("John");
    dbUser1.setName("Johny");
    DbUser dbUser2 = new DbUser();
    dbUser2.setUserId(2);
    dbUser2.setUsername("Jim");
    dbUser2.setName("Jimmy");
    List<DbUser> dbUserList = Arrays.asList(dbUser1, dbUser2);

    int pageSize = 10;
    Pageable pagedByPageSizePosts = PageRequest.of(0, pageSize);
    when(userRepository.findAllWhoMostPopular(pagedByPageSizePosts)).thenReturn(dbUserList);

    List<DbUser> userList = userServiceImp.getUsersWhoMostPopular(0);

    Assertions.assertEquals(2, userList.size());
    Assertions.assertEquals(1, userList.get(0).getUserId());
    Assertions.assertEquals("John", userList.get(0).getUsername());
    Assertions.assertEquals("Johny", userList.get(0).getName());
  }

}