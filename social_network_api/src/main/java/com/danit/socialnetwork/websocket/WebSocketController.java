package com.danit.socialnetwork.websocket;

import com.danit.socialnetwork.dto.NotificationType;
import com.danit.socialnetwork.dto.NotificationRequest;
import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.dto.message.MessageDtoRequest;
import com.danit.socialnetwork.dto.post.RepostDtoSave;
import com.danit.socialnetwork.dto.user.UserDtoResponse;
import com.danit.socialnetwork.dto.user.UserFollowDtoResponse;
import com.danit.socialnetwork.mappers.InboxMapperImpl;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Message;
import com.danit.socialnetwork.model.Notification;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.rest.MessageRestController;
import com.danit.socialnetwork.service.PostService;
import com.danit.socialnetwork.service.UserService;
import com.danit.socialnetwork.service.NotificationService;
import com.danit.socialnetwork.service.MessageService;
import com.danit.socialnetwork.service.InboxService;
import com.danit.socialnetwork.service.UserFollowService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Controller
@RequiredArgsConstructor
@Data
public class WebSocketController {
  private final NotificationService notificationService;
  private final UserFollowService userFollowService;
  private final UserService userService;
  private final PostService postService;
  private final InboxService inboxService;
  private final MessageService messageService;
  private final MessageRestController messageRestController;
  private final InboxMapperImpl mapper;

  private static final String UNREAD_BY_USER = "unreadByUser";
  private static final String UNREAD = "unread";

  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  private Map<String, Integer> sendUnreadMessagesToUserReceiver(Integer userId) {
    String userIdString = userId.toString();
    int unreadMessagesNum = messageService
        .numberUnreadMessages(userId);
    Map<String, Integer> unreadMessages = new HashMap<>();
    unreadMessages.put(UNREAD, unreadMessagesNum);
    log.info("unread {}", unreadMessagesNum);

    messagingTemplate.convertAndSendToUser(userIdString, "/unread", unreadMessages);
    return unreadMessages;
  }

  private InboxDtoResponse getInbox(Integer userId, Integer inboxUid) {
    List<InboxDtoResponse> inboxes = inboxService.getInboxesByInboxUid(userId);
    return inboxes.stream().filter(i -> i.getUserId().equals(inboxUid)).toList().get(0);
  }

  private void setUnreadMessagesByUserNumToInboxDtoResponse(Integer inboxUid, Integer userId, InboxDtoResponse inbox) {
    int unreadMessagesByUserNumSenderR = messageService
        .numberUnreadMessagesByUser(inboxUid, userId);
    Map<String, Integer> unreadMessagesByUserR = new HashMap<>();
    unreadMessagesByUserR.put(UNREAD_BY_USER, unreadMessagesByUserNumSenderR);
    inbox.setUnreadByUser(unreadMessagesByUserNumSenderR);
  }

  private void getLog(Integer inboxUid, Integer userId) {
    log.info("inboxUid {}", inboxUid);
    log.info("userId {}", userId);
  }

  @MessageMapping("/post")
  public NotificationRequest postNotification(
      @Payload NotificationRequest notificationRequest) throws InterruptedException {

    Thread.sleep(500);

    UserDtoResponse user = userService.findByUserId(notificationRequest.getUserId());

    LocalDateTime dateTime = LocalDateTime.now();
    notificationRequest.setDateTime(dateTime);

    Integer userId = user.getUserId();
    Integer postId = postService.findLatestPostIdByUserId(userId);
    notificationRequest.setEventId(postId);
    log.info("POST ID: " + postId);

    String notificationType = NotificationType.POST.get();
    notificationRequest.setEventType(notificationType);

    String userName = user.getUsername();
    notificationRequest.setUserName(userName);

    String userPhoto = user.getProfileImageLink();
    notificationRequest.setUserPhoto(userPhoto);

    String notificationText = userName + " published a new post";
    notificationRequest.setNotificationText(notificationText);

    notificationRequest.setNotificationRead(false);

    List<UserFollowDtoResponse> followers = userFollowService
        .getAllUsersByUserFollowerId(userId);

    for (UserFollowDtoResponse follower : followers) {
      Integer followerId = follower.getUserId();

      Notification newNotification = new Notification(
          followerId, notificationType, notificationRequest.getEventId(), notificationRequest.getUserId(),
          userName, userPhoto, notificationText);
      notificationService.saveNotification(newNotification);

      String followerIdString = followerId.toString();
      messagingTemplate.convertAndSendToUser(followerIdString, "/notifications", notificationRequest);

      int unreadNotificationsNum = notificationService
          .findAllByFollowerUserIdAndNotificationRead(followerId, false).size();
      Map<String, Integer> unreadNotifications = new HashMap<>();
      unreadNotifications.put("unreadNotifications", unreadNotificationsNum);
      messagingTemplate.convertAndSendToUser(followerIdString, "/unread_notifications", unreadNotifications);
    }
    return notificationRequest;
  }

  @MessageMapping("/repost")
  public NotificationRequest postNotification(
      @Payload RepostDtoSave repostDtoSave) {
    Integer repostUserId = repostDtoSave.getUserId();
    Integer postId = repostDtoSave.getPostId();

    Post postByPostId = postService.findPostByPostId(postId);

    Integer authUserId = postByPostId.getUserPost().getUserId();

    DbUser repostUser = userService.findDbUserByUserId(repostUserId);

    String notificationType = NotificationType.POST.get();

    NotificationRequest notificationRequest = new NotificationRequest();

    LocalDateTime dateTime = LocalDateTime.now();
    notificationRequest.setDateTime(dateTime);

    notificationRequest.setUserId(authUserId);

    notificationRequest.setEventType(notificationType);
    notificationRequest.setEventId(postId);

    String repostUserUsername = repostUser.getUsername();
    notificationRequest.setUserName(repostUserUsername);

    String repostUserPhoto = repostUser.getProfileImageUrl();
    notificationRequest.setUserPhoto(repostUserPhoto);

    String notificationText = repostUserUsername + " reposted your post";
    notificationRequest.setNotificationText(notificationText);

    notificationRequest.setNotificationRead(false);

    Notification newNotification = new Notification(
        authUserId, notificationType, postId, repostUserId,
        repostUserUsername, repostUserPhoto, notificationText);

    notificationService.saveNotification(newNotification);

    String authUserIdString = authUserId.toString();
    messagingTemplate.convertAndSendToUser(authUserIdString, "/notifications", notificationRequest);

    int unreadNotificationsNum = notificationService
        .findAllByFollowerUserIdAndNotificationRead(authUserId, false).size();
    Map<String, Integer> unreadNotifications = new HashMap<>();
    unreadNotifications.put("unreadNotifications", unreadNotificationsNum);
    messagingTemplate.convertAndSendToUser(authUserIdString, "/unread_notifications", unreadNotifications);

    return notificationRequest;
  }

  @MessageMapping("/post_like")
  public NotificationRequest postLikeNotification(
      @Payload RepostDtoSave repostDtoSave) {
    Integer likerUser = repostDtoSave.getUserId();
    Integer postId = repostDtoSave.getPostId();

    Post postByPostId = postService.findPostByPostId(postId);

    Integer authUserId = postByPostId.getUserPost().getUserId();

    DbUser likerDbUser = userService.findDbUserByUserId(likerUser);

    String notificationType = NotificationType.POST.get();

    NotificationRequest notificationRequest = new NotificationRequest();

    LocalDateTime dateTime = LocalDateTime.now();
    notificationRequest.setDateTime(dateTime);

    notificationRequest.setUserId(authUserId);

    notificationRequest.setEventType(notificationType);
    notificationRequest.setEventId(postId);

    String likerUserUsername = likerDbUser.getUsername();
    notificationRequest.setUserName(likerUserUsername);

    String likerUserPhoto = likerDbUser.getProfileImageUrl();
    notificationRequest.setUserPhoto(likerUserPhoto);

    String notificationText = likerUserUsername + " likes your post";
    notificationRequest.setNotificationText(notificationText);

    notificationRequest.setNotificationRead(false);

    Notification newNotification = new Notification(
        authUserId, notificationType, postId, likerUser,
        likerUserUsername, likerUserPhoto, notificationText);

    notificationService.saveNotification(newNotification);

    String authUserIdString = authUserId.toString();
    messagingTemplate.convertAndSendToUser(authUserIdString, "/notifications", notificationRequest);

    int unreadNotificationsNum = notificationService
        .findAllByFollowerUserIdAndNotificationRead(authUserId, false).size();
    Map<String, Integer> unreadNotifications = new HashMap<>();
    unreadNotifications.put("unreadNotifications", unreadNotificationsNum);
    messagingTemplate.convertAndSendToUser(authUserIdString, "/unread_notifications", unreadNotifications);

    return notificationRequest;
  }

  @MessageMapping("/addMessage")
  public InboxDtoResponse postAddMessage(
      @Payload MessageDtoRequest messageDtoRequest) {

    Integer inboxUid = messageDtoRequest.getInboxUid();
    Integer userId = messageDtoRequest.getUserId();
    getLog(inboxUid, userId);

    InboxDtoResponse inboxS = getInbox(inboxUid, userId);

    setUnreadMessagesByUserNumToInboxDtoResponse(userId, inboxUid, inboxS);

    String inboxUidString = inboxUid.toString();
    messagingTemplate.convertAndSendToUser(inboxUidString, "/inbox", inboxS);
    messagingTemplate.convertAndSendToUser(inboxUidString, "/getMessages", inboxS);

    InboxDtoResponse inboxR = getInbox(userId, inboxUid);

    inboxR.setInboxUid(inboxUid);
    inboxR.setUserId(userId);
    String userIdString = userId.toString();
    messagingTemplate.convertAndSendToUser(userIdString, "/inbox", inboxR);
    messagingTemplate.convertAndSendToUser(userIdString, "/getMessages", inboxR);

    sendUnreadMessagesToUserReceiver(userId);

    return inboxS;
  }

  @MessageMapping("/getMessages")
  public InboxDtoResponse postReadMessages(
      @Payload MessageDtoRequest messageDtoRequest) {
    messageRestController.readMessage(messageDtoRequest);
    Integer inboxUid = messageDtoRequest.getInboxUid();
    Integer userId = messageDtoRequest.getUserId();
    getLog(inboxUid, userId);

    InboxDtoResponse inboxR = getInbox(userId, inboxUid);

    inboxR.setInboxUid(inboxUid);
    inboxR.setUserId(userId);
    String userIdString = userId.toString();
    messagingTemplate.convertAndSendToUser(userIdString, "/inbox", inboxR);
    messagingTemplate.convertAndSendToUser(userIdString, "/getMessages", inboxR);
    sendUnreadMessagesToUserReceiver(userId);
    return inboxR;
  }

}