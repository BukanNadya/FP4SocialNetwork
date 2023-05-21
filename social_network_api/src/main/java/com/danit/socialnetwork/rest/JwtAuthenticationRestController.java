package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.JwtRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.security.JwtTokenService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
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

    String email = authRequest.getEmail();
    String password = authRequest.getPassword();
    boolean rememberMe = Boolean.parseBoolean(authRequest.getRememberMe());

    Optional<DbUser> optionalDbUser = userService.findDbUserByEmail(email);

    if (optionalDbUser.isPresent()) {
      String username = optionalDbUser.get().getUsername();
      authenticate(username, password);
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


  @GetMapping("/home")
  public ResponseEntity<?> getUserId(Authentication authentication) throws IOException {
    if (authentication == null) {
      return null;
    } else {
      OAuth2User data = (OAuth2User) authentication.getPrincipal();
      String email = (String) data.getAttributes().get("email");
      Optional<DbUser> maybeUser = userService.findDbUserByEmail(email);

      if (maybeUser.isPresent()) {
        Integer userId = maybeUser.get().getUserId();
        LocalDate dob = maybeUser.get().getDateOfBirth();
        String birthday = "true";
        if (dob.isEqual(LocalDate.of(1900, 1, 1))) {
          birthday = "false";
        }

        final String token = jwtTokenService.generateToken(userId, true);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("birthday", birthday);
        return new ResponseEntity<>(response, HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

}