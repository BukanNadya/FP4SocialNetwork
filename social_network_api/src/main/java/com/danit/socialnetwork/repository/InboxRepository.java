package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InboxRepository extends JpaRepository<Inbox, Integer> {

  Optional<Inbox> findByInboxUidAndLastSentUserId(Integer inboxUid, Integer lastSentUserId);

  List<Inbox> getInboxesByInboxUid(Integer inboxUid);
}
