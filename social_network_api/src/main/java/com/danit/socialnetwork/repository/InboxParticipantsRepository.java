package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.InboxParticipants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InboxParticipantsRepository extends JpaRepository<InboxParticipants, Integer> {

  Optional<InboxParticipants> findByInboxUidAndUserId(Integer inboxUid, Integer userId);

}
