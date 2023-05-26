package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import com.danit.socialnetwork.repository.PasswordChangeRequestsRepo;
import com.danit.socialnetwork.repository.PostLikeRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PasswordChangerServiceImplTest {

  @InjectMocks
  PasswordChangerServiceImpl changerService;
  @Mock
  PasswordChangeRequestsRepo passwordChangeRequestsRepo;

  @Test
  void changePassword() {
    PasswordChangeRequests passwordChangeRequests = new PasswordChangeRequests();
    passwordChangeRequests.setChangeRequest("55555");
    passwordChangeRequests.setEmail("test@test.com");

    when(passwordChangeRequestsRepo.getPasswordChangeRequestsByChangeRequest("55555")).thenReturn(Optional.of(passwordChangeRequests));

    Optional<PasswordChangeRequests> emailBySecretCode = changerService.getEmailBySecretCode("55555");
    assertEquals("test@test.com", emailBySecretCode.get().getEmail());
  }

  @Test
  void codeCheck() {
    CodeCheckRequest codeCheckRequest = new CodeCheckRequest();
    codeCheckRequest.setCode("55555");
    codeCheckRequest.setEmail("test@test.com");


    PasswordChangeRequests passwordChangeRequests = new PasswordChangeRequests();
    passwordChangeRequests.setChangeRequest("55555");
    passwordChangeRequests.setEmail("test@test.com");

    when(passwordChangeRequestsRepo.getPasswordChangeRequestsByChangeRequest("55555")).thenReturn(Optional.of(passwordChangeRequests));

    ResponseEntity<Map<String, String>> mapResponseEntity = changerService.codeCheck(codeCheckRequest);

    assertEquals("{message=code accessed, email=test@test.com}", mapResponseEntity.getBody().toString());
  }
}