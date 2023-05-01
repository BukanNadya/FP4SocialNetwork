package com.danit.socialnetwork.security;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;

@Configuration
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

  private final UserService userService;

  private UserDetails mapper(DbUser dbUser) {
    return User
        .withUsername(dbUser.getUsername())
        .password(dbUser.getPassword())
        .authorities(new ArrayList<>())
        .build();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userService.findByUsername(username)
        .map(this::mapper)
        .orElseThrow(() -> new UsernameNotFoundException(
            String.format("user `%s` not found", username)
        ));
  }

}

