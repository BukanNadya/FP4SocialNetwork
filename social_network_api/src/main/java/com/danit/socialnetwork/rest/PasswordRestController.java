
// package com.danit.socialnetwork.rest;

// import com.danit.socialnetwork.controller.PasswordChanger;
// import com.danit.socialnetwork.dto.ChangePasswordRequest;
// import com.danit.socialnetwork.dto.CodeCheckRequest;
// import com.danit.socialnetwork.dto.NewPasswordRequest;
// import com.danit.socialnetwork.model.DbUser;
// import com.danit.socialnetwork.model.PasswordChangeRequests;
// import com.danit.socialnetwork.repository.UserRepository;
// import com.danit.socialnetwork.service.PasswordChangerService;
// import lombok.Data;
// import lombok.RequiredArgsConstructor;
// import lombok.extern.log4j.Log4j2;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.PostMapping;


// import java.util.Optional;

// @Log4j2
// @RestController
// @RequiredArgsConstructor
// public class PasswordRestController {
//   PasswordChanger passChanger = new PasswordChanger();
//   private final PasswordChangerService passwordChangerService;
//   private final UserRepository userRepo;

//   @Data
//   private static class UserEmail {
//     private final String email;
//   }

//   @PostMapping("/api/changepassword")
//   public ResponseEntity<?> changePass(@RequestBody ChangePasswordRequest changePasswordRequest) {
//     String userEmail = changePasswordRequest.getEmail();
//     Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);

//     if (maybeUser.isPresent()) {
//       String secretUrl = passChanger.change(userEmail);
//       log.info(passwordChangerService.saveRequest(userEmail, secretUrl));
//       return ResponseEntity.ok("Instructions sent on, " + userEmail);
//     } else {
//       return new ResponseEntity<>("User with email " + userEmail + " is not registered",
//           HttpStatus.BAD_REQUEST);
//     }
//   }

//   @PostMapping("/api/codecheck")
//   public ResponseEntity<?> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
//     String userEmail = codeCheckRequest.getEmail();
//     String secretCode = codeCheckRequest.getCode();
//     Optional<PasswordChangeRequests> maybeRequest = passwordChangerService.getEmailByUuid(secretCode);

//     if (maybeRequest.isPresent()) {
//       UserEmail email = new UserEmail(maybeRequest.get().getEmail());
//       if (email.getEmail().equals(userEmail)) {
//         log.info("Change password page call from e-mail " + email.getEmail());
//         passwordChangerService.deleteRequestByEmail(maybeRequest.get().getEmail());
//         return new ResponseEntity<>("code accessed", HttpStatus.OK);
//       }
//     }
//     log.info("Invalid code");
//     return new ResponseEntity<>("Invalid code",
//         HttpStatus.BAD_REQUEST);
//   }


//   @PostMapping("/api/newpassword")
//   public ResponseEntity<?> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
//     String userEmail = newPasswordRequest.getEmail();
//     String password = newPasswordRequest.getPassword();

//     Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);

//     if (maybeUser.isPresent()) {
//       BCryptPasswordEncoder bcenc = new BCryptPasswordEncoder();
//       String encodedPass = bcenc.encode(password);
//       if (passwordChangerService.changePassword(userEmail, encodedPass)) {
//         return new ResponseEntity<>("Password changed", HttpStatus.OK);
//       }
//     }
//     return new ResponseEntity<>("User with email " + userEmail + " is not registered",
//         HttpStatus.BAD_REQUEST);
//   }

// }


package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.JwtRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.dto.PasswordChangeRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.PasswordChangerService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
@RestController
@RequiredArgsConstructor
public class PasswordRestController {
  private final PasswordChangerService passwordChangerService;

  private final PasswordEncoder enc;

  private final JwtAuthenticationRestController jwtAuthenticationRestController;
  private final UserService userService;

  @PostMapping("/api/changepassword")
  public ResponseEntity<Object> changePass(@RequestBody ChangePasswordRequest changePasswordRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.changePassword(changePasswordRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("/api/codecheck")
  public ResponseEntity<Object> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.codeCheck(codeCheckRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("/api/newpassword")
  public ResponseEntity<Object> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.authenticateUser(newPasswordRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("/api/change_password")
  public ResponseEntity<Object> changeUserPassword(
      @RequestBody PasswordChangeRequest passwordChangeRequest) throws Exception {

    DbUser user = userService.findDbUserByUserId(passwordChangeRequest.getUserId());
    if (user == null) {
      return new ResponseEntity<>("INVALID_CREDENTIALS", HttpStatus.NOT_FOUND);
    }

    String userEmail = user.getEmail();
    JwtRequest authRequest = new JwtRequest();
    authRequest.setEmail(userEmail);
    authRequest.setPassword(passwordChangeRequest.getCurrentPassword());
    authRequest.setRememberMe("true");
    ResponseEntity<?> authenticationToken = jwtAuthenticationRestController.createAuthenticationToken(authRequest);

    if (authenticationToken.getStatusCodeValue() == 200) {
      user.setPassword(enc.encode(passwordChangeRequest.getNewPassword()));
      userService.saveUser(user);
      return new ResponseEntity<>("Password changed", HttpStatus.OK);
    }
    return new ResponseEntity<>("INVALID_CREDENTIALS", HttpStatus.NOT_FOUND);
  }
}