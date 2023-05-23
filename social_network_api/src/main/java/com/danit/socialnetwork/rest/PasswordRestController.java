package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.controller.PasswordChanger;
import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import com.danit.socialnetwork.repository.UserRepository;
import com.danit.socialnetwork.service.PasswordChangerServiceImpl;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class PasswordRestController {
  PasswordChanger passChanger = new PasswordChanger();
  private final PasswordChangerServiceImpl passwordChangerServiceImpl;
  private final UserRepository userRepo;

  @Data
  private static class UserEmail {
    private final String email;
  }

  @PostMapping("/api/changepassword")
  public ResponseEntity<?> changePass(@RequestBody ChangePasswordRequest changePasswordRequest) {
    String userEmail = changePasswordRequest.getEmail();
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();
    if (maybeUser.isPresent()) {
      String secretUrl = passChanger.change(userEmail);
      log.info(passwordChangerServiceImpl.saveRequest(userEmail, secretUrl));
      response.put("email", userEmail);
      response.put("message", "Instructions sent on, " + userEmail);
      return ResponseEntity.ok(response);
    } else {
      response.put("email", userEmail);
      response.put("message", "User with email " + userEmail + " is not registered");
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/api/codecheck")
  public ResponseEntity<?> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    String userEmail = codeCheckRequest.getEmail();
    String secretCode = codeCheckRequest.getCode();
    Optional<PasswordChangeRequests> maybeRequest = passwordChangerServiceImpl.getEmailByUuid(secretCode);
    Map<String, String> response = new HashMap<>();
    if (maybeRequest.isPresent()) {
      UserEmail email = new UserEmail(maybeRequest.get().getEmail());
      if (email.getEmail().equals(userEmail)) {
        log.info("Change password page call from e-mail " + email.getEmail());
        passwordChangerServiceImpl.deleteRequestByEmail(maybeRequest.get().getEmail());
        response.put("email", userEmail);
        response.put("message", "code accessed");
        return ResponseEntity.ok(response);
      }
    }
    log.info("Invalid code");
    response.put("email", userEmail);
    response.put("message", "Invalid code");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/api/newpassword")
  public ResponseEntity<?> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    String userEmail = newPasswordRequest.getEmail();
    String password = newPasswordRequest.getPassword();

    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();

    if (maybeUser.isPresent()) {
      BCryptPasswordEncoder bcenc = new BCryptPasswordEncoder();
      String encodedPass = bcenc.encode(password);
      if (passwordChangerServiceImpl.changePassword(userEmail, encodedPass)) {
        response.put("email", userEmail);
        response.put("message", "Password changed");
        return ResponseEntity.ok(response);
      }
    }
    response.put("email", userEmail);
    response.put("message", "User with email " + userEmail + " is not registered");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }
}