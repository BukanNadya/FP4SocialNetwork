import com.danit.socialnetwork.dto.*;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.rest.UserRestController;
import com.danit.socialnetwork.service.PasswordChangerService;
import com.danit.socialnetwork.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
public class UserRestControllerTest {

  private MockMvc mockMvc;

  @Mock
  private UserService userService;

  @InjectMocks
  private UserRestController controller;

  @Before
  public void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
  }

  @Test
  public void testHandleRegistrationPost() throws Exception {
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
  public void testHandleCheckEmailPost() throws Exception {
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
  public void testHandleSendLetterPost() throws Exception {
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
  public void testHandleActivatePost() throws Exception {
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
  public void testHandleSearchPost() throws Exception {
    String nameSearch = "dya";

    SearchRequest userSearch = new SearchRequest();
    userSearch.setUserSearch(nameSearch);

    mockMvc.perform(post("/search")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(userSearch)))
        .andExpect(status().isOk());

    verify(userService).filterCachedUsersByName(userSearch.getUserSearch());
  }

}