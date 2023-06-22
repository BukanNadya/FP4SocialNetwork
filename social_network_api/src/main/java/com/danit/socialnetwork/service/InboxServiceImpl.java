package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.exception.user.UserNotFoundException;
import com.danit.socialnetwork.mappers.InboxMapperImpl;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.InboxRepository;
import com.danit.socialnetwork.repository.MessageRepository;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class InboxServiceImpl implements InboxService {
  private final InboxRepository inboxRepository;
  private final UserRepository userRepository;
  private final MessageRepository messageRepository;
  private final InboxMapperImpl mapper;
  private final SimpMessagingTemplate messagingTemplate;
  private static final String USER_NOT_FOUND = "User with userId %d not found";

  /*The method finds inbox by message sender and receiver and returns it*/
  @Override
  public Optional<Inbox> findByInboxUidAndLastSentUserId(DbUser inboxUid, DbUser lastSentUserId) {
    return inboxRepository.findByInboxUidAndUserId(inboxUid, lastSentUserId);
  }

  /*The method saves a new inbox if it does not exist and updates it if it does exist and returns it*/
  @Override
  public List<Inbox> saveInbox(DbUser senderId, DbUser receiverId, Message message) {
    List<Inbox> inboxesSenderAndReceiver = new ArrayList<>();

    Optional<Inbox> inboxSender = inboxRepository.findByInboxUidAndUserId(senderId, receiverId);
    if (inboxSender.isEmpty()) {
      Inbox inboxNewSender = new Inbox(senderId, receiverId, message, null);
      Inbox inboxS = inboxRepository.save(inboxNewSender);
      Inbox inboxNewReceiver = new Inbox(receiverId, senderId, message, null);
      Inbox inboxR = inboxRepository.save(inboxNewReceiver);
      inboxesSenderAndReceiver.add(inboxS);
      inboxesSenderAndReceiver.add(inboxR);
    } else {
      Optional<Inbox> inboxFromDbRo = inboxRepository.findByInboxUidAndUserId(receiverId, senderId);
      if (inboxFromDbRo.isPresent()) {
        Inbox inboxFromDbS = inboxSender.get();
        inboxFromDbS.setLastMessage(message);
        Inbox inboxFromDbR = inboxFromDbRo.get();
        inboxFromDbR.setLastMessage(message);
        Inbox inboxS = inboxRepository.save(inboxFromDbS);
        Inbox inboxR = inboxRepository.save(inboxFromDbR);
        inboxesSenderAndReceiver.add(inboxS);
        inboxesSenderAndReceiver.add(inboxR);
      }
    }
    return inboxesSenderAndReceiver;
  }

  /*The method finds the inbox by sender and returns it*/
  @Override
  public List<InboxDtoResponse> getInboxesByInboxUid(Integer inboxUid) {
    List<InboxDtoResponse> inboxesDto;
    Optional<DbUser> oInboxUid = userRepository.findById(inboxUid);
    if (oInboxUid.isEmpty()) {
      throw new UserNotFoundException(String.format("User with userId %s not found", inboxUid));
    } else {
      List<Inbox> inboxes = inboxRepository.getInboxesByInboxUid(oInboxUid.get());
      inboxesDto = inboxes.stream()
          .map(mapper::inboxToInboxDtoResponse).toList();
    }
    return inboxesDto;
  }

  /*The method saves a new inbox, finds the inbox by sender and returns it*/
  @Override
  public List<InboxDtoResponse> saveNewInbox(InboxParticipantsDtoRequest request) {
    Integer senderId = request.getInboxUid();
    Integer receiverId = request.getUserId();
    Optional<DbUser> userSender = userRepository.findById(senderId);
    DbUser userS = null;
    if (userSender.isPresent()) {
      userS = userSender.get();
    } else {
      throw new UserNotFoundException(String.format(USER_NOT_FOUND, senderId));
    }
    Optional<DbUser> userReceiver = userRepository.findById(receiverId);
    DbUser userR = null;
    if (userReceiver.isPresent()) {
      userR = userReceiver.get();
    } else {
      throw new UserNotFoundException(String.format(USER_NOT_FOUND, receiverId));
    }
    Message message = new Message();
    messageRepository.save(message);
    saveInbox(userS, userR, message);
    return getInboxesByInboxUid(senderId);
  }
}
