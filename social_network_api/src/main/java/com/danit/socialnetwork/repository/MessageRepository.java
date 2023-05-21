package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

  List<Message> findByInboxUidAndUserIdOrUserIdAndInboxUid(
      Integer inboxUid, Integer userId, Integer inboxUidIncoming, Integer userIdIncoming);
}
