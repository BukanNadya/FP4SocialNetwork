package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.controller.PasswordChanger;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;


import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class PasswordRestController {
  PasswordChanger passChanger = new PasswordChanger();
  private final PasswordChangerService passwordChangerService;
  private final UserRepository userRepo;

  //    @RequiredArgsConstructor
  @Data
  private static class UserEmail {
    private final String email;
  }

  @PostMapping("/changepassword")
  public ResponseEntity<?> changePass(@RequestBody Map<String, String> loginData,
                                      HttpServletRequest request) {
    String userEmail = loginData.get("email");
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);

    if (maybeUser.isPresent()) {
      String secretUrl = passChanger.change(request, userEmail);
      log.info(passwordChangerService.saveRequest(userEmail, secretUrl));
      return ResponseEntity.ok("Instructions sent on, " + userEmail);
    } else {
      return new ResponseEntity<>("User with email " + userEmail + " is not registered",
          HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/changepassword{uuid}")
  public ResponseEntity<?> res(@PathVariable("uuid") String uuid) {

    Optional<PasswordChangeRequests> maybeRequest = passwordChangerService.getEmailByUuid(uuid);

    if (maybeRequest.isPresent()) {
      UserEmail email = new UserEmail(maybeRequest.get().getEmail());
      log.info("Change password page call from e-mail " + email.getEmail());
      passwordChangerService.deleteRequestByEmail(maybeRequest.get().getEmail());
      return new ResponseEntity<>(email, HttpStatus.OK);
    } else {
      log.info("Invalid Change password page link from e-mail");
      return new ResponseEntity<>("Invalid Change password page link from e-mail",
          HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/newpassword")
  public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginData) {
    String userEmail = loginData.get("email");
    String password = loginData.get("password");

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
