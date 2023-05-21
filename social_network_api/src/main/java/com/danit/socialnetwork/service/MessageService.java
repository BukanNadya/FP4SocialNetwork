package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.model.Message;

import java.util.List;

public interface MessageService {

  Message saveMessage(Message message);

  List<Message> findByInboxUidAndUserIdOrUserIdAndInboxUid(
      Integer inboxUid, Integer userId, Integer inboxUidIncoming, Integer userIdIncoming);
}
