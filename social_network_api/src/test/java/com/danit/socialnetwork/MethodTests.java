package com.danit.socialnetwork;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserRepository;
import com.danit.socialnetwork.service.PasswordChangerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MethodTests {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordChangerService passwordChangerService;

  @Test
  public void findByUsername() {
    Optional<DbUser> user = userRepository.findByUsername("Alex");
    String username = user.get().getUsername();
    assertEquals("Alex", username);
  }

  @Test
  public void findDbUserByEmail() {
    Optional<DbUser> user = userRepository.findDbUserByEmail("khmarenko.a@gmail.com");
    String username = user.get().getUsername();
    assertEquals("Alex", username);
  }

  @Test
  public void saveRequest() {
    String text = passwordChangerService.saveRequest("test@test.com", "123456");
    assertEquals("request to change password from test@test.com", text);
  }
}
