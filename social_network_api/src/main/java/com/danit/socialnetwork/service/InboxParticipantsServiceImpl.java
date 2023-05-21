package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.InboxParticipants;
import com.danit.socialnetwork.repository.InboxParticipantsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class InboxParticipantsServiceImpl implements InboxParticipantsService {

  private final InboxParticipantsRepository inboxParticipantsRepository;

  @Override
  public Optional<InboxParticipants> findByInboxUidAndUserId(Integer inboxUid, Integer userId) {
    return inboxParticipantsRepository.findByInboxUidAndUserId(inboxUid, userId);
  }

  @Override
  public InboxParticipants saveInboxParticipants(Integer inboxUid, Integer userId) {
    Optional<InboxParticipants> inboxParticipantsSender = findByInboxUidAndUserId(inboxUid, userId);
    if (inboxParticipantsSender.isEmpty()) {
      InboxParticipants inboxParticipantsNew = new InboxParticipants();
      inboxParticipantsNew.setInboxUid(inboxUid);
      inboxParticipantsNew.setUserId(userId);
      inboxParticipantsRepository.save(inboxParticipantsNew);
      return inboxParticipantsNew;
    }
    return inboxParticipantsSender.get();
  }
}
