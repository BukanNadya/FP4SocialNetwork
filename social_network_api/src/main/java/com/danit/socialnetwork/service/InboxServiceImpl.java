package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.repository.InboxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class InboxServiceImpl implements InboxService {

  private final InboxRepository inboxRepository;

  @Override
  public Optional<Inbox> findByInboxUidAndLastSentUserId(Integer inboxUid, Integer lastSentUserId) {
    return inboxRepository.findByInboxUidAndLastSentUserId(inboxUid, lastSentUserId);
  }

  @Override
  public Inbox saveInbox(Integer inboxUid, Integer userId, String writtenMessage, LocalDateTime createdAt) {
    Optional<Inbox> inboxSender = findByInboxUidAndLastSentUserId(inboxUid, userId);
    if (inboxSender.isEmpty()) {
      Inbox inboxNew = new Inbox();
      inboxNew.setInboxUid(inboxUid);
      inboxNew.setLastMessage(writtenMessage);
      inboxNew.setCreatedAt(createdAt);
      inboxNew.setLastSentUserId(userId);
      inboxRepository.save(inboxNew);
      return inboxNew;
    } else {
      Inbox inboxFromDb = inboxSender.get();
      inboxFromDb.setInboxId(inboxSender.get().getInboxId());
      inboxFromDb.setInboxUid(inboxSender.get().getInboxUid());
      inboxFromDb.setLastMessage(writtenMessage);
      inboxFromDb.setCreatedAt(createdAt);
      inboxRepository.save(inboxFromDb);
      return inboxFromDb;
    }
  }

  @Override
  public List<Inbox> getInboxesByInboxUid(Integer inboxUid) {
    return inboxRepository.getInboxesByInboxUid(inboxUid);
  }
}
