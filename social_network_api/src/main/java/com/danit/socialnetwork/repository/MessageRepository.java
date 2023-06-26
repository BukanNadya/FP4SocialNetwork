package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

  @Query(nativeQuery = true, value = "SELECT DISTINCT m.message_id, m.message,"
      + " m.created_at, m.message_reade, m.inbox_uid, m.user_id"
      + " FROM Message m WHERE "
      + "((m.inbox_uid = :inboxUid AND m.user_id = :userId) "
      + "OR (m.user_id = :inboxUidIncoming AND m.inbox_uid = :userIdIncoming)) "
      + "ORDER BY m.created_at DESC "
      + "OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY;")
  List<Message> findByInboxUidAndUserIdOrUserIdAndInboxUid(
      DbUser inboxUid, DbUser userId, DbUser inboxUidIncoming, DbUser userIdIncoming,
      @Param("offset") int offset,
      @Param("pageSize") int pageSize);

  @Query("SELECT m FROM Message m JOIN FETCH m.userId u WHERE m.inboxUid = :inboxUid OR m.userId = :userId")
  List<Message> findMessageByInboxUidOrUserId(@Param("inboxUid") DbUser inboxUid, @Param("userId") DbUser userId);

  List<Message> findAllByInboxUidAndUserIdAndMessageReadeEquals(DbUser inboxUid, DbUser userId, Boolean messageReade);

  List<Message> findAllByUserIdAndMessageReadeEquals(DbUser inboxUid, Boolean messageReade);
}
