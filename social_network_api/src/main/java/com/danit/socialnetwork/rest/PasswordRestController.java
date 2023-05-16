package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.controller.PasswordChanger;
import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import com.danit.socialnetwork.repository.UserRepository;
import com.danit.socialnetwork.service.PasswordChangerService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class PasswordRestController {
  PasswordChanger passChanger = new PasswordChanger();
  private final PasswordChangerService passwordChangerService;
  private final UserRepository userRepo;

  @Data
  private static class UserEmail {
    private final String email;
  }

  @PostMapping("/api/changepassword")
  public ResponseEntity<?> changePass(@RequestBody ChangePasswordRequest changePasswordRequest) {
    String userEmail = changePasswordRequest.getEmail();
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);

    if (maybeUser.isPresent()) {
      String secretUrl = passChanger.change(userEmail);
      log.info(passwordChangerService.saveRequest(userEmail, secretUrl));
      return ResponseEntity.ok("Instructions sent on, " + userEmail);
    } else {
      return new ResponseEntity<>("User with email " + userEmail + " is not registered",
          HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/api/codecheck")
  public ResponseEntity<?> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    String userEmail = codeCheckRequest.getEmail();
    String secretCode = codeCheckRequest.getCode();
    Optional<PasswordChangeRequests> maybeRequest = passwordChangerService.getEmailByUuid(secretCode);

    if (maybeRequest.isPresent()) {
      UserEmail email = new UserEmail(maybeRequest.get().getEmail());
      if (email.getEmail().equals(userEmail)) {
        log.info("Change password page call from e-mail " + email.getEmail());
        passwordChangerService.deleteRequestByEmail(maybeRequest.get().getEmail());
        return new ResponseEntity<>("code accessed", HttpStatus.OK);
      }
    }
    log.info("Invalid code");
    return new ResponseEntity<>("Invalid code",
        HttpStatus.BAD_REQUEST);
  }


  @PostMapping("/api/newpassword")
  public ResponseEntity<?> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    String userEmail = newPasswordRequest.getEmail();
    String password = newPasswordRequest.getPassword();

    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);

    if (maybeUser.isPresent()) {
      BCryptPasswordEncoder bcenc = new BCryptPasswordEncoder();
      String encodedPass = bcenc.encode(password);
      if (passwordChangerService.changePassword(userEmail, encodedPass)) {
        return new ResponseEntity<>("Password changed", HttpStatus.OK);
      }
    }
    return new ResponseEntity<>("User with email " + userEmail + " is not registered",
        HttpStatus.BAD_REQUEST);
  }
}