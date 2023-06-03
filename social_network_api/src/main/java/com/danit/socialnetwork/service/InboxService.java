package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxDtoRequest;
import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;

import java.util.List;
import java.util.Optional;

public interface InboxService {

  Optional<Inbox> findByInboxUidAndLastSentUserId(DbUser inboxUid, DbUser lastSentUserId);

  List<Inbox> saveInbox(DbUser senderId, DbUser receiverId, Message message);

  List<InboxDtoResponse> getInboxesByInboxUid(InboxDtoRequest request);

}
