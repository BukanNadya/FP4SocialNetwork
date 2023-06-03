package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InboxRepository extends JpaRepository<Inbox, Integer> {

  Optional<Inbox> findByInboxUidAndUserId(DbUser inboxUid, DbUser userId);

  @Query("SELECT i FROM inbox i JOIN FETCH i.userId u WHERE i.inboxUid = :inboxUid")
  List<Inbox> getInboxesByInboxUid(@Param("inboxUid") DbUser inboxUid);

}
