import com.danit.socialnetwork.dto.JwtRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.rest.JwtAuthenticationRestController;
import com.danit.socialnetwork.security.JwtTokenService;
import com.danit.socialnetwork.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.mockito.ArgumentMatchers.any;

import java.util.Optional;

import static org.mockito.BDDMockito.given;


@RunWith(MockitoJUnitRunner.class)
public class JwtAuthenticationRestControllerTest {

  @Mock
  private AuthenticationManager authenticationManager;

  @Mock
  private JwtTokenService tokenService;

  @Mock
  private UserService userService;

  @InjectMocks
  private JwtAuthenticationRestController controller;

  private MockMvc mockMvc;

  @Before
  public void setUp() {
    controller = new JwtAuthenticationRestController(authenticationManager, tokenService, userService);
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  public void testCreateAuthenticationTokenWithValidCredentials() throws Exception {
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
    given(tokenService.generateToken(12, rememberMe)).willReturn(token)
        .willReturn(token);  // Adjusted here

    mockMvc.perform(post("/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(authRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("token").value(token));

    Mockito.verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    Mockito.verify(userService).findDbUserByEmail(email);
    Mockito.verify(userService).findByUsername(username);
  }

}