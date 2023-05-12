package com.danit.socialnetwork.security;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.security.JwtUserDetailsService;
import com.danit.socialnetwork.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JwtUserDetailsServiceTest {

  @Autowired
  private JwtUserDetailsService userDetailsService;

  @MockBean
  private UserService userService;

  @Test
  public void testLoadUserByUsername() throws Exception {
    DbUser dbUser = new DbUser();
    dbUser.setUsername("user123");
    dbUser.setPassword("password");

    when(userService.findByUsername("user123")).thenReturn(Optional.of(dbUser));
    UserDetails userDetails = userDetailsService.loadUserByUsername("user123");

    assertEquals("user123", userDetails.getUsername());
    assertEquals("password", userDetails.getPassword());
    assertNotEquals(Collections.emptyList(), userDetails.getAuthorities());
  }

  @Test
  public void testLoadUserByUsernameWithNonexistentUser() throws Exception {
    when(userService.findByUsername("nonexistentUser")).thenReturn(Optional.empty());

    assertThrows(UsernameNotFoundException.class, () -> {
      userDetailsService.loadUserByUsername("nonexistentUser");
    });
  }

}