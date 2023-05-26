package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.Optional;

public interface PasswordChangerService {

  String saveRequest(@RequestBody CodeCheckRequest codeCheckRequest);

  Optional<PasswordChangeRequests> getEmailBySecretCode(String secretCode);

  void deleteRequestByEmail(String email);

  ResponseEntity<Map<String, String>> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest);

  ResponseEntity<Map<String, String>> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest);

  ResponseEntity<Map<String, String>> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest);

  boolean changedPassword(@RequestBody NewPasswordRequest newPasswordRequest);
}