package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import com.danit.socialnetwork.repository.PasswordChangeRequestsRepo;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class PasswordChangerServiceImpl implements PasswordChangerService {
  private final PasswordChangeRequestsRepo passwordChangeRequestsRepo;
  private final UserRepository userRepo;
  private final MailSenderImpl mailSender;


  String email = "email";
  String message = "message";

  public String changeRequest(String userEmail) {

    String secretCode = UUID.randomUUID().toString().substring(0, 8);

    String textMessage = "If you really want to change your current "
        + "password for logging into your Capitweet account, "
        + "enter this code to create "
        + "a new password: \n\n" + secretCode;


    mailSender.send(userEmail, "Change Capitweet password", textMessage);
    return secretCode;
  }

  @Override
  public String saveRequest(@RequestBody CodeCheckRequest codeCheckRequest) {
    PasswordChangeRequests pcr = new PasswordChangeRequests();
    pcr.setEmail(codeCheckRequest.getEmail());
    pcr.setChangeRequest(codeCheckRequest.getCode());
    passwordChangeRequestsRepo.save(pcr);
    return "request to change password from " + codeCheckRequest.getEmail();
  }

  @Override
  public ResponseEntity<Map<String, String>> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
    String userEmail = changePasswordRequest.getEmail();
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();
    if (maybeUser.isPresent()) {
      String secretCode = changeRequest(userEmail);
      CodeCheckRequest codeCheckRequest = new CodeCheckRequest();
      codeCheckRequest.setEmail(userEmail);
      codeCheckRequest.setCode(secretCode);
      log.info(saveRequest(codeCheckRequest));
      response.put(email, userEmail);
      response.put(message, "Instructions sent on, " + userEmail);
      return ResponseEntity.ok(response);
    } else {
      response.put(email, userEmail);
      response.put(message, "User with email " + userEmail + " is not registered");
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
  }

  @Override
  public Optional<PasswordChangeRequests> getEmailBySecretCode(String secretCode) {
    return passwordChangeRequestsRepo.getPasswordChangeRequestsByChangeRequest(secretCode);
  }

  @Override
  public void deleteRequestByEmail(String email) {
    passwordChangeRequestsRepo.deleteById(email);
  }

  @Override
  public ResponseEntity<Map<String, String>> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    String userEmail = codeCheckRequest.getEmail();
    String secretCode = codeCheckRequest.getCode();
    Optional<PasswordChangeRequests> maybeRequest = getEmailBySecretCode(secretCode);
    Map<String, String> response = new HashMap<>();
    if (maybeRequest.isPresent()) {
      String maybeEmail = maybeRequest.get().getEmail();
      if (maybeEmail.equals(userEmail)) {
        log.info("Change password page call from e-mail " + maybeEmail);
        deleteRequestByEmail(maybeRequest.get().getEmail());
        response.put(email, userEmail);
        response.put(message, "code accessed");
        return ResponseEntity.ok(response);
      }
    }
    log.info("Invalid code from codeCheckRequest");
    response.put(email, userEmail);
    response.put(message, "Invalid code");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @Override
  public boolean changedPassword(@RequestBody NewPasswordRequest newPasswordRequest) {
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(newPasswordRequest.getEmail());
    if (maybeUser.isPresent()) {
      DbUser refreshUser = maybeUser.get();
      refreshUser.setPassword(newPasswordRequest.getPassword());
      userRepo.save(refreshUser);
      return true;
    } else {
      return false;
    }
  }

  @Override
  public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    String userEmail = newPasswordRequest.getEmail();
    String password = newPasswordRequest.getPassword();

    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();

    if (maybeUser.isPresent()) {
      BCryptPasswordEncoder bcenc = new BCryptPasswordEncoder();
      String encodedPass = bcenc.encode(password);
      NewPasswordRequest newPasswordRequest1 = new NewPasswordRequest();
      newPasswordRequest1.setEmail(userEmail);
      newPasswordRequest1.setPassword(encodedPass);
      if (changedPassword(newPasswordRequest1)) {
        response.put(email, userEmail);
        response.put(message, "Password changed");
        return ResponseEntity.ok(response);
      }
    }
    response.put(email, userEmail);
    response.put(message, "User with email " + userEmail + " is not registered");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }
}
