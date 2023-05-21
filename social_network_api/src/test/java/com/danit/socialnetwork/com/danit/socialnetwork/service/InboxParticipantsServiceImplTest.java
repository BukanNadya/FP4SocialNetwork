package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.InboxParticipants;
import com.danit.socialnetwork.repository.InboxParticipantsRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InboxParticipantsServiceImplTest {
  @InjectMocks
  InboxParticipantsServiceImpl inboxParticipantsService;
  @Mock
  InboxParticipantsRepository inboxParticipantsRepository;

  @Test
  void findByInboxUidAndUserId_shouldFindInboxParticipants() {
    InboxParticipants testInboxParticipants = new InboxParticipants();
    testInboxParticipants.setInboxUid(28);
    testInboxParticipants.setUserId(34);

    when(inboxParticipantsRepository.findByInboxUidAndUserId(28, 34))
        .thenReturn(Optional.of(testInboxParticipants));

    Optional<InboxParticipants> testFindInboxParticipants = inboxParticipantsService
        .findByInboxUidAndUserId(28, 34);

    Mockito.verify(inboxParticipantsRepository).findByInboxUidAndUserId(28, 34);

    Assert.assertEquals(Optional.of(testInboxParticipants), testFindInboxParticipants);
  }

  @Test
  void findByInboxUidAndUserId_shouldNotFindInboxParticipants_WhenNotExists() {
    Optional<InboxParticipants> testFindInboxParticipants = inboxParticipantsService
        .findByInboxUidAndUserId(28, 34);

    Mockito.verify(inboxParticipantsRepository).findByInboxUidAndUserId(28, 34);

    Assert.assertEquals(Optional.empty(), testFindInboxParticipants);
  }

  @Test
  void saveInboxParticipants_shouldSaveInboxParticipants_WhenNotExists() {
    InboxParticipants testInboxParticipants = new InboxParticipants();
    testInboxParticipants.setInboxUid(10);
    testInboxParticipants.setUserId(11);

    when(inboxParticipantsService.findByInboxUidAndUserId(10, 11))
        .thenReturn(Optional.empty());

    InboxParticipants testSaveInboxParticipants = inboxParticipantsService
        .saveInboxParticipants(10, 11);
    Mockito.verify(inboxParticipantsRepository).findByInboxUidAndUserId(10, 11);
    Mockito.verify(inboxParticipantsRepository).save(testSaveInboxParticipants);

    Assert.assertEquals(testInboxParticipants, testSaveInboxParticipants);
  }

}