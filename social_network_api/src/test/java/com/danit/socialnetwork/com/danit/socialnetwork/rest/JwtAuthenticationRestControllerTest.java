package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.JwtRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.security.JwtTokenService;
import com.danit.socialnetwork.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationRestControllerTest {

  @Mock
  private AuthenticationManager authenticationManager;

  @Mock
  private JwtTokenService tokenService;

  @Mock
  private UserService userService;

  @InjectMocks
  private JwtAuthenticationRestController controller;

  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  void createAuthenticationToken() throws Exception {
    String email = "bukan.nadya@gmail.com";
    String username = "Nadya";
    String password = "123";
    boolean rememberMe = true;

    JwtRequest authRequest = new JwtRequest();
    authRequest.setEmail(email);
    authRequest.setPassword(password);
    authRequest.setRememberMe(String.valueOf(rememberMe));

    DbUser dbUser = new DbUser();
    dbUser.setUsername(username);
    dbUser.setEmail(email);
    dbUser.setPassword(password);
    dbUser.setUserId(12);

    String token = tokenService.generateToken(12, true);

    given(userService.findDbUserByEmail(email)).willReturn(Optional.of(dbUser));
    given(userService.findByUsername(username)).willReturn(Optional.of(dbUser));
    given(tokenService.generateToken(12, rememberMe)).willReturn(token);

    mockMvc.perform(post("/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(authRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("token").value(token));

    Mockito.verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    Mockito.verify(userService).findDbUserByEmail(email);
    Mockito.verify(userService).findByUsername(username);
  }

  @Test
  void getUserId() throws Exception {
    String email = "bukan.nadya@gmail.com";
    String username = "Nadya";
    String password = "12";
    boolean rememberMe = true;

    JwtRequest authRequest = new JwtRequest();
    authRequest.setEmail(email);
    authRequest.setPassword(password);
    authRequest.setRememberMe(String.valueOf(rememberMe));

    DbUser dbUser = new DbUser();
    dbUser.setUsername(username);
    dbUser.setEmail(email);
    dbUser.setPassword(password);

    given(userService.findDbUserByEmail(email)).willReturn(Optional.of(dbUser));
    given(userService.findByUsername(username)).willReturn(Optional.of(dbUser));

    mockMvc.perform(post("/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(authRequest)))
        .andExpect(status().isOk());

    Mockito.verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    Mockito.verify(userService).findDbUserByEmail(email);
    Mockito.verify(userService).findByUsername(username);
  }

}