package com.danit.socialnetwork.service;

import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.dto.message.MessageDtoResponse;
import com.danit.socialnetwork.dto.message.search.MessageSearchDto;
import com.danit.socialnetwork.dto.search.SearchRequest;
import com.danit.socialnetwork.mappers.MessageMapper;
import com.danit.socialnetwork.mappers.MessageSearchMapper;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.danit.socialnetwork.config.GuavaCache.messageCache;

@Service
@RequiredArgsConstructor
@Log4j2
public class MessageServiceImpl implements MessageService {

  private final MessageRepository messageRepository;
  private final UserService userService;
  private final MessageSearchMapper searchMapper;
  private final InboxServiceImpl inboxService;
  private final MessageMapper messageMapper;
  private final SimpMessagingTemplate messagingTemplate;
  private static final String MESSAGE_CACHE = "MessageCache";
  private static final String USER_NOT_FOUND = "User with userId %d not found";

  /*Method save a new message and returns it*/
  @Override
  public MessageDtoResponse saveMessage(MessageDtoRequest request) {
    Integer userSenderId = request.getInboxUid();
    Integer userReceiverId = request.getUserId();
    DbUser userS = userService.findDbUserByUserId(userSenderId);
    DbUser userR = userService.findDbUserByUserId(userReceiverId);

    String writtenMessage = request.getWrittenMessage();
    Message message = new Message();
    message.setMessageText(writtenMessage);
    message.setInboxUid(userS);
    message.setUserId(userR);
    message.setMessageReade(false);
    Message savedMessage = messageRepository.save(message);
    log.info(String.format("Save message: %s", savedMessage.getMessageText()));

    inboxService.saveInbox(userS, userR, savedMessage);
    return messageMapper.messageToMessageDtoResponse(savedMessage);
  }

  /*The method finds all messages between the sender and the receiver and returns them*/
  @Override
  public List<MessageDtoResponse> findByInboxUidAndUserIdOrUserIdAndInboxUid(
      InboxParticipantsDtoRequest request, Integer page) {
    int pageSize = 16;
    int offset = page * pageSize;
    DbUser inboxUid = userService.findDbUserByUserId(request.getInboxUid());
    DbUser userId = userService.findDbUserByUserId(request.getUserId());
    List<Message> messagePage = messageRepository.findByInboxUidAndUserIdOrUserIdAndInboxUid(
        inboxUid, userId, inboxUid, userId, offset, pageSize);
    messagePage.stream().forEach(message -> {
      message.setMessageReade(true);
      messageRepository.save(message);
    });
    return messagePage.stream().map(messageMapper::messageToMessageDtoResponse).toList();
  }

  /*The method finds all incoming and outgoing messages of the user and returns them*/
  @Override
  public List<Message> findMessageByInboxUidOrUserId(DbUser inboxUid, DbUser userId) {
    return messageRepository.findMessageByInboxUidOrUserId(userId, userId);
  }

  /*The method writes all messages to cache if there is no cache,
   and filters messages from cache by requested string. And returns them*/
  @Override
  public List<MessageSearchDto> filterCachedMessageByString(SearchRequest request) {
    List<MessageSearchDto> search;
    Integer userId = Integer.valueOf(request.getUserId());
    DbUser userFromDb = userService.findDbUserByUserId(userId);
    String messageSearch = request.getSearch();

    if (messageCache.getIfPresent(MESSAGE_CACHE) == null) {
      List<Message> cacheMessage = messageRepository.findMessageByInboxUidOrUserId(userFromDb, userFromDb);
      log.debug(String.format("cacheMessage.size = %d", cacheMessage.size()));
      messageCache.put(MESSAGE_CACHE, cacheMessage);
    }
    log.debug(String.format("filterCachedMessagesByString: %s. "
        + "Should find all messages by string.", messageSearch));
    search = messageCache.getIfPresent(MESSAGE_CACHE).stream()
        .filter(m -> m.getMessageText().toLowerCase().contains(messageSearch.toLowerCase()))
        .map(searchMapper::messageToMessageSearchDto).toList();
    log.debug(String.format("filterCachedMessageByString: %s. Find all Messages by string.", messageSearch));
    return search;
  }

  /*The method counts the number of unread messages by user and returns it*/
  @Override
  public Integer numberUnreadMessagesByUser(Integer inboxUid, Integer userId) {
    DbUser userS = userService.findDbUserByUserId(inboxUid);
    DbUser userR = userService.findDbUserByUserId(userId);
    return messageRepository.findAllByInboxUidAndUserIdAndMessageReadeEquals(userS, userR, false).size();
  }

  /*The method counts the number of unread messages returns it*/
  @Override
  public Integer numberUnreadMessages(Integer inboxUid) {
    DbUser userS = userService.findDbUserByUserId(inboxUid);
    return messageRepository.findAllByInboxUidAndMessageReadeEquals(userS, false).size();
  }

}
