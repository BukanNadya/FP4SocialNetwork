package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

  Page<Message> findByInboxUidAndUserIdOrUserIdAndInboxUid(
      DbUser inboxUid, DbUser userId, DbUser inboxUidIncoming, DbUser userIdIncoming, Pageable page);

  @Query("SELECT m FROM Message m JOIN FETCH m.userId u WHERE m.inboxUid = :inboxUid OR m.userId = :userId")
  List<Message> findMessageByInboxUidOrUserId(@Param("inboxUid") DbUser inboxUid, @Param("userId") DbUser userId);


}
