package com.danit.socialnetwork.rest;

import com.danit.socialnetwork.dto.message.MessageGetAllDtoResponse;
import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.dto.message.MessageDtoResponse;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.dto.message.InboxDtoRequest;
import com.danit.socialnetwork.dto.message.InboxParticipantsDtoRequest;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.service.InboxParticipantsService;
import com.danit.socialnetwork.service.InboxService;
import com.danit.socialnetwork.service.MessageService;
import com.danit.socialnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MessageRestController {
  private final MessageService messageService;
  private final InboxService inboxService;
  private final InboxParticipantsService inboxParticipantsService;
  private final UserService userService;

  @PostMapping(path = "/message")
  public ResponseEntity<MessageDtoResponse> addMessage(@RequestBody MessageDtoRequest messageDtoRequest) {
    Integer inboxUid = messageDtoRequest.getInboxUid();
    Integer userId = messageDtoRequest.getUserId();
    String writtenMessage = messageDtoRequest.getWrittenMessage();

    Message message = new Message();
    message.setInboxUid(inboxUid);
    message.setUserId(userId);
    message.setMessage(writtenMessage);

    Message dbMessage = messageService.saveMessage(message);
    LocalDateTime createdAt = dbMessage.getCreatedAt();

    inboxService.saveInbox(inboxUid, userId, writtenMessage, createdAt);
    inboxService.saveInbox(userId, inboxUid, writtenMessage, createdAt);

    inboxParticipantsService.saveInboxParticipants(inboxUid, userId);
    inboxParticipantsService.saveInboxParticipants(userId, inboxUid);

    return new ResponseEntity<>(MessageDtoResponse.from(dbMessage), HttpStatus.CREATED);
  }

  @GetMapping(path = "/inbox")
  @ResponseBody
  public ResponseEntity<List<InboxDtoResponse>> getInbox(@RequestBody InboxDtoRequest inboxDtoRequest) throws IOException {

    Integer inboxUid = inboxDtoRequest.getInboxUid();
    List<Inbox> inboxes =  inboxService.getInboxesByInboxUid(inboxUid);

    return new ResponseEntity<>(InboxDtoResponse.from(inboxes, userService), HttpStatus.OK);
  }

  @GetMapping(path = "/message")
  @ResponseBody
  public ResponseEntity<List<MessageGetAllDtoResponse>> getMessage(
      @RequestBody InboxParticipantsDtoRequest participantsDtoRequest) {

    Integer inboxUid = participantsDtoRequest.getInboxUid();
    Integer userId = participantsDtoRequest.getUserId();
    List<Message> messages =  messageService
        .findByInboxUidAndUserIdOrUserIdAndInboxUid(inboxUid, userId, inboxUid, userId);

    return new ResponseEntity<>(MessageGetAllDtoResponse.from(messages), HttpStatus.OK);
  }
}
