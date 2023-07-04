package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.mappers.InboxMapperImpl;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.InboxRepository;
import com.danit.socialnetwork.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class InboxServiceImpl implements InboxService {
  private final InboxRepository inboxRepository;
  private final MessageRepository messageRepository;
  private final UserServiceImpl userService;
  private final InboxMapperImpl mapper;

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
      Inbox inboxNewSender = new Inbox(senderId, receiverId, message);
      Inbox inboxS = inboxRepository.save(inboxNewSender);
      Inbox inboxNewReceiver = new Inbox(receiverId, senderId, message);
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
    DbUser userS = userService.findDbUserByUserId(inboxUid);
    return inboxRepository.getInboxesByInboxUid(userS).stream()
        .map(inbox -> {
          InboxDtoResponse inboxDto = mapper.inboxToInboxDtoResponse(inbox);
          DbUser userR = userService.findDbUserByUserId(inboxDto.getUserId());
          inboxDto.setUnreadByUser(messageRepository
              .findAllByInboxUidAndUserIdAndMessageReadeEquals(userR, userS, false).size());
          return inboxDto;
        }).toList();
  }

  /*The method saves a new inbox, finds the inbox by sender and returns it*/
  @Override
  public InboxDtoResponse addInbox(InboxParticipantsDtoRequest request) {
    Integer senderId = request.getInboxUid();
    Integer receiverId = request.getUserId();
    DbUser userS = userService.findDbUserByUserId(senderId);
    DbUser userR = userService.findDbUserByUserId(receiverId);
    Optional<Inbox> inboxSenderO = inboxRepository.findByInboxUidAndUserId(userS, userR);
    if (inboxSenderO.isPresent()) {
      return mapper.inboxToInboxDtoResponse(inboxSenderO.get());
    }
    List<Inbox> inboxesNew = saveInbox(userS, userR, null);
    Inbox inboxSender = inboxesNew.stream()
        .filter(inbox -> inbox.getInboxUid()
            .getUserId().equals(senderId)).toList().get(0);
    return mapper.inboxToInboxDtoResponse(inboxSender);
  }

}
