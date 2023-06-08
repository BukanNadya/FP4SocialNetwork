package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.UserEmailRequest;
import com.danit.socialnetwork.dto.RegistrationRequest;
import com.danit.socialnetwork.dto.UserEmailForLoginRequest;
import com.danit.socialnetwork.dto.ActivateCodeRequest;
import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.dto.user.UserDtoForPostLikeResponse;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.dto.user.UserDtoForSidebar;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserRestControllerTest {
  @Mock
  UserService userService;
  @InjectMocks
  UserRestController controller;
  private MockMvc mockMvc;
  private static final String FALSE = "false";
  private static final String TRUE = "true";

  @BeforeEach
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  void handleRegistrationPostStatusOk() throws Exception {
    String email = "Test@gmail.com";
    String username = "Nadya";
    String password = "123";
    String name = "Nadya";
    LocalDate dateOfBirth = (LocalDate.of(1999, 01, 27));

    RegistrationRequest registrationRequest = new RegistrationRequest();
    registrationRequest.setEmail(email);
    registrationRequest.setUsername(username);
    registrationRequest.setPassword(password);
    registrationRequest.setName(name);
    registrationRequest.setDay(27);
    registrationRequest.setMonth(01);
    registrationRequest.setYear(1999);

    DbUser dbUser = new DbUser();
    dbUser.setUsername(username);
    dbUser.setEmail(email);
    dbUser.setPassword(password);
    dbUser.setName(name);
    dbUser.setDateOfBirth(dateOfBirth);

    Map<String, String> response = new HashMap<>();
    response.put("registration", TRUE);

    when(userService.save(any(RegistrationRequest.class))).thenReturn(ResponseEntity.ok(response));

    mockMvc.perform(post("/api/registration")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(registrationRequest)))
        .andExpect(status().isOk());

    verify(userService).save(registrationRequest);
  }

  @Test
  void handleRegistrationPostStatusBadRequest() throws Exception {
    String email = "Test@";
    String username = "Test";
    String password = "Test";
    String name = "Test";
    LocalDate dateOfBirth = (LocalDate.of(2023, 01, 27));

    RegistrationRequest registrationRequest = new RegistrationRequest();
    registrationRequest.setEmail(email);
    registrationRequest.setUsername(username);
    registrationRequest.setPassword(password);
    registrationRequest.setName(name);
    registrationRequest.setDay(27);
    registrationRequest.setMonth(01);
    registrationRequest.setYear(1999);

    DbUser dbUser = new DbUser();
    dbUser.setUsername(username);
    dbUser.setEmail(email);
    dbUser.setPassword(password);
    dbUser.setName(name);
    dbUser.setDateOfBirth(dateOfBirth);

    Map<String, String> response = new HashMap<>();
    response.put("registration", FALSE);

    when(userService.save(any(RegistrationRequest.class)))
        .thenReturn(new ResponseEntity<>(response, HttpStatus.BAD_REQUEST));

    mockMvc.perform(post("/api/registration")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(registrationRequest)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void handleCheckEmailStatusFound() throws Exception {
    String email = "Test@gmail.com";
    UserEmailForLoginRequest emailRequest = new UserEmailForLoginRequest();
    emailRequest.setEmail(email);
    DbUser dbUser = new DbUser();
    dbUser.setEmail(email);
    Map<String, String> response = new HashMap<>();
    response.put("checkEmail", TRUE);

    when(userService.findDbUserByEmail(any(UserEmailForLoginRequest.class)))
        .thenReturn(new ResponseEntity<>(response, HttpStatus.FOUND));

    mockMvc.perform(post("/api/checkEmail")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isFound());

    verify(userService).findDbUserByEmail(emailRequest);
  }

  @Test
  void handleCheckEmailStatusNotFound() throws Exception {
    String email = "Test@";
    UserEmailForLoginRequest emailRequest = new UserEmailForLoginRequest();
    emailRequest.setEmail(email);
    Map<String, String> response = new HashMap<>();
    response.put("checkEmail", FALSE);

    when(userService.findDbUserByEmail(any(UserEmailForLoginRequest.class)))
        .thenReturn(new ResponseEntity<>(response, HttpStatus.NOT_FOUND));

    mockMvc.perform(post("/api/checkEmail")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isNotFound());

    verify(userService).findDbUserByEmail(emailRequest);
  }

  @Test
  void handleSendLetterPostStatusOk() throws Exception {
    String email = "Test@gmail.com";
    String name = "Nadya";
    UserEmailRequest emailRequest = new UserEmailRequest();
    emailRequest.setEmail(email);
    emailRequest.setName(name);
    Map<String, String> response = new HashMap<>();
    response.put("sendLetter", TRUE);

    when(userService.sendLetter(any(UserEmailRequest.class))).thenReturn(ResponseEntity.ok(response));

    mockMvc.perform(post("/api/sendLetter")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isOk());

    verify(userService).sendLetter(emailRequest);
  }

  @Test
  void handleSendLetterPostStatusBadRequest() throws Exception {
    String email = "Test@";
    String name = "Test";
    UserEmailRequest emailRequest = new UserEmailRequest();
    emailRequest.setEmail(email);
    emailRequest.setName(name);
    Map<String, String> response = new HashMap<>();
    response.put("sendLetter", FALSE);

    when(userService.sendLetter(any(UserEmailRequest.class)))
        .thenReturn(new ResponseEntity<>(response, HttpStatus.BAD_REQUEST));

    mockMvc.perform(post("/api/sendLetter")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isBadRequest());

    verify(userService).sendLetter(emailRequest);
  }

  @Test
  void handleActivatePostStatusOk() throws Exception {
    Integer code = 123456;
    ActivateCodeRequest codeRequest = new ActivateCodeRequest();
    codeRequest.setCode(code);
    Map<String, String> response = new HashMap<>();
    response.put("activate", TRUE);

    when(userService.activateUser(any(ActivateCodeRequest.class))).thenReturn(ResponseEntity.ok(response));

    mockMvc.perform(post("/api/activate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(codeRequest)))
        .andExpect(status().isOk());

    verify(userService).activateUser(codeRequest);
  }

  @Test
  void handleActivatePostStatusBadRequest() throws Exception {
    Integer code = 123456;
    ActivateCodeRequest codeRequest = new ActivateCodeRequest();
    codeRequest.setCode(code);
    Map<String, String> response = new HashMap<>();
    response.put("activate", FALSE);

    when(userService.activateUser(any(ActivateCodeRequest.class)))
        .thenReturn(new ResponseEntity<>(response, HttpStatus.BAD_REQUEST));

    mockMvc.perform(post("/api/activate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(codeRequest)))
        .andExpect(status().isBadRequest());

    verify(userService).activateUser(codeRequest);
  }

  @Test
  void handleSearch() throws Exception {
    DbUser testDbUser1 = new DbUser();
    testDbUser1.setName("Nadya");
    DbUser testDbUser2 = new DbUser();
    testDbUser2.setName("Nadin");
    DbUser testDbUser3 = new DbUser();
    testDbUser3.setName("Katya");
    List<DbUser> dbUsers = new ArrayList<>();
    dbUsers.add(testDbUser1);
    dbUsers.add(testDbUser2);
    dbUsers.add(testDbUser3);

    String nameSearch = "ya";
    String userId = "2";
    SearchRequest search = new SearchRequest();
    search.setSearch(nameSearch);
    search.setUserId(userId);

    SearchDto testSearchDto1 = new SearchDto();
    testSearchDto1.setName("Nadya");
    SearchDto testSearchDto2 = new SearchDto();
    testSearchDto2.setName("Katya");
    List<SearchDto> testSearchDto = new ArrayList<>();
    testSearchDto.add(testSearchDto1);
    testSearchDto.add(testSearchDto2);

    when(userService.filterCachedUsersByName(search)).thenReturn(testSearchDto);

    mockMvc.perform(post("/api/search")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(search)))
        .andExpect(status().isFound());

    verify(userService).filterCachedUsersByName(search);
  }

  @Test
  void getProfileImage() {
  }

  @Test
  void getBackgroundImage() {
  }

  @Test
  void getUserById() throws IOException {
    Integer userId = 1;
    Integer followers = 3;
    Integer followings = 1;


    UserDtoResponse userDtoResponse = new UserDtoResponse();
    userDtoResponse.setUsername("Nicky");
    userDtoResponse.setName("Nick");
    userDtoResponse.setFollowers(followers);
    userDtoResponse.setFollowings(followings);

    when(userService.findByUserId(userId)).thenReturn(userDtoResponse);

    ResponseEntity<UserDtoResponse> result = controller.getUserById(userId);

    Assertions.assertEquals("Nick", result.getBody().getName());
    Assertions.assertEquals("Nicky", result.getBody().getUsername());
    Assertions.assertEquals(followers, result.getBody().getFollowers());
    Assertions.assertEquals(followings, result.getBody().getFollowings());
  }

  @Test
  void testHandleEditionPost_successfulUpdate() {
    EditingDtoRequest request = new EditingDtoRequest();
    Map<String, String> responseTest = new HashMap<>();
    responseTest.put("edition", TRUE);
    when(userService.update(request)).thenReturn(ResponseEntity.ok(responseTest));

    ResponseEntity<Map<String, String>> response = controller.handleEditionPost(request);

    Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
    Assertions.assertEquals(TRUE, response.getBody().get("edition"));
  }

  @Test
  void testHandleEditionPost_failedUpdate() {
    EditingDtoRequest request = new EditingDtoRequest();
    Map<String, String> responseTest = new HashMap<>();
    responseTest.put("edition", FALSE);
    when(userService.update(request))
        .thenReturn(new ResponseEntity<>(responseTest, HttpStatus.BAD_REQUEST));

    ResponseEntity<Map<String, String>> response = controller.handleEditionPost(request);

    Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    Assertions.assertEquals(FALSE, response.getBody().get("edition"));
  }

  @Test
  void getUsersWhoLikedPostByPostId() {

    DbUser dbUser1 = new DbUser();
    DbUser dbUser2 = new DbUser();
    List<DbUser> dbUserList = Arrays.asList(dbUser1, dbUser2);

    when(userService.getUsersWhoLikedPostByPostId(1, 1)).thenReturn(dbUserList);
    List<UserDtoForPostLikeResponse> list = controller.getUsersWhoLikedPostByPostId(1, 1);

    Assertions.assertEquals(2, list.size());


  }

  @Test
  void getUsersWhoMostPopular() {

    DbUser dbUser1 = new DbUser();
    DbUser dbUser2 = new DbUser();
    List<DbUser> dbUserList = Arrays.asList(dbUser1, dbUser2);

    when(userService.getUsersWhoMostPopular(1)).thenReturn(dbUserList);
    List<UserDtoForSidebar> list = controller.getUsersWhoMostPopular(1);

    Assertions.assertEquals(2, list.size());
  }
}