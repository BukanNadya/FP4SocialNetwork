package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.JwtRequest;
import com.danit.socialnetwork.security.JwtTokenService;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class JwtAuthenticationRestController {

  private final AuthenticationManager authenticationManager;

  private final JwtTokenService jwtTokenService;

  private final UserService userService;

  @PostMapping("/login")
  public ResponseEntity<?> createAuthenticationToken(
      @RequestBody JwtRequest authRequest)
      throws Exception {

    String username = authRequest.getUsername();
    String password = authRequest.getPassword();
    boolean rememberMe = Boolean.parseBoolean(authRequest.getRememberMe());

    authenticate(username, password);

    Optional<DbUser> optionalDbUser = userService.findByUsername(username);

    if (optionalDbUser.isPresent()) {
      Integer id = optionalDbUser.get().getUserId();
      final String token = jwtTokenService.generateToken(id, rememberMe);
      Map<String, String> response = new HashMap<>();
      response.put("token", token);
      return ResponseEntity.ok(response);
    } else {
      throw new BadCredentialsException("Invalid username or password");
    }
    
  }

  private void authenticate(String username, String password) throws Exception {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
    Optional<DbUser> dbUser = userService.findByUsername(username);
    if (dbUser.isEmpty()) {
      throw new UsernameNotFoundException(
          String.format("User this username %s not found", username));
    }
  }

}
