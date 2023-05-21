package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.*;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserRestControllerTest {

  @Mock
  UserService userService;

  @InjectMocks
  UserRestController controller;

  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  void handleRegistrationPost() throws Exception {
    String email = "bukan.nadya@gmail.com";
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

    when(userService.save(any(DbUser.class))).thenReturn(true);

    mockMvc.perform(post("/registration")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(registrationRequest)))
        .andExpect(status().isOk());

    verify(userService).save(dbUser);
  }

  @Test
  void handleCheckUsernamePost() throws Exception {
    String email = "bukan.nadya@gmail.com";

    UserEmailForLoginRequest emailRequest = new UserEmailForLoginRequest();
    emailRequest.setEmail(email);

    DbUser dbUser = new DbUser();
    dbUser.setEmail(email);

    when(userService.findDbUserByEmail(any(String.class))).thenReturn(Optional.of(dbUser));

    mockMvc.perform(post("/checkEmail")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isOk());

    verify(userService).findDbUserByEmail(emailRequest.getEmail());
  }

  @Test
  void handleSendLetterPost() throws Exception {
    String email = "bukan.nadya@gmail.com";
    String name = "Nadya";

    UserEmailRequest emailRequest = new UserEmailRequest();
    emailRequest.setEmail(email);
    emailRequest.setName(name);

    mockMvc.perform(post("/sendLetter")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(emailRequest)))
        .andExpect(status().isOk());

    verify(userService).sendLetter(emailRequest.getName(), emailRequest.getEmail());
  }

  @Test
  void handleActivatePost() throws Exception {
    Integer code = 123456;

    ActivateCodeRequest codeRequest = new ActivateCodeRequest();
    codeRequest.setCode(code);

    mockMvc.perform(post("/activate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(codeRequest)))
        .andExpect(status().isOk());

    verify(userService).activateUser(codeRequest.getCode());
  }

  @Test
  void handleSearchPost() throws Exception {
    String nameSearch = "dya";

    SearchRequest userSearch = new SearchRequest();
    userSearch.setUserSearch(nameSearch);

    mockMvc.perform(post("/search")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(userSearch)))
        .andExpect(status().isOk());

    verify(userService).filterCachedUsersByName(userSearch.getUserSearch());
  }

  @Test
  void getUser() {
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

    when (userService.findByUserId(userId)).thenReturn(userDtoResponse);

    ResponseEntity<UserDtoResponse> result = controller.getUserById(userId);

    Assertions.assertEquals("Nick", result.getBody().getName());
    Assertions.assertEquals("Nicky", result.getBody().getUsername());
    Assertions.assertEquals(followers,result.getBody().getFollowers());
    Assertions.assertEquals(followings,result.getBody().getFollowings());
  }
}