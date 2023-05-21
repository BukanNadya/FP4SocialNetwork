package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.Inbox;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface InboxService {

  Optional<Inbox> findByInboxUidAndLastSentUserId(Integer inboxUid, Integer lastSentUserId);

  Inbox saveInbox(Integer inboxUid, Integer userId, String writtenMessage, LocalDateTime createdAt);

  List<Inbox> getInboxesByInboxUid(Integer inboxUid);

}
