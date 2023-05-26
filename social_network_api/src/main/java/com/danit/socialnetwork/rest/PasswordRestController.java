package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.service.PasswordChangerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
@RestController
@RequiredArgsConstructor
public class PasswordRestController {
  private final PasswordChangerService passwordChangerService;

  @PostMapping("/api/changepassword")
  public ResponseEntity<?> changePass(@RequestBody ChangePasswordRequest changePasswordRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.changePassword(changePasswordRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("/api/codecheck")
  public ResponseEntity<?> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.codeCheck(codeCheckRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }

  @PostMapping("/api/newpassword")
  public ResponseEntity<?> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    ResponseEntity<?> responseEntity = passwordChangerService.authenticateUser(newPasswordRequest);
    return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
  }
}