package com.danit.socialnetwork.security;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtUserDetailsServiceTest {
  @InjectMocks
  JwtUserDetailsService userDetailsService;
  @Mock
  UserService userService;

  @Test
  void loadUserByUsername() throws IOException {
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
  void loadUserByUsername_WithNonexistentUser() throws IOException {
    when(userService.findByUsername("nonexistentUser")).thenReturn(Optional.empty());

    assertThrows(UsernameNotFoundException.class, () -> {
      userDetailsService.loadUserByUsername("nonexistentUser");
    });
  }
}