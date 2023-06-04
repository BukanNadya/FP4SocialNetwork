package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;

import java.time.LocalDateTime;
import java.util.Base64;

public class MapperUtils {

  private MapperUtils() {
  }

  public static String getProfileImageUrl(DbUser dbUser) {
    return dbUser.getProfileImageUrl();
  }

  public static String getProfileImageUrl(Inbox inbox) {
    return inbox.getUserId().getProfileImageUrl();
  }

  public static String getProfileImageUrl(Message message) {
    return message.getUserId().getProfileImageUrl();
  }

  public static String getProfileBackgroundImageUrl(DbUser dbUser) {
    return dbUser.getProfileBackgroundImageUrl();
  }

  public static String encodeProfile(EditingDtoRequest editingDtoRequest) {
    byte[] profile = editingDtoRequest.getProfileImageUrl();
    if (profile == null) {
      return null;
    }
    return Base64.getEncoder().encodeToString(profile);
  }

  public static String encodeProfileBackground(EditingDtoRequest editingDtoRequest) {
    byte[] profileBackground = editingDtoRequest.getProfileBackgroundImageUrl();
    if (profileBackground == null) {
      return null;
    }
    return Base64.getEncoder().encodeToString(profileBackground);
  }

  public static Integer getUserId(DbUser dbUser) {
    return dbUser.getUserId();
  }

  public static Integer getUserId(Message message) {
    return message.getUserId().getUserId();
  }

  public static Integer getUserId(Inbox inbox) {
    return inbox.getUserId().getUserId();
  }

  public static String getUsername(DbUser dbUser) {
    return dbUser.getUsername();
  }

  public static String getUsername(Message message) {
    return message.getUserId().getUsername();
  }

  public static String getUsername(Inbox inbox) {
    return inbox.getUserId().getUsername();
  }

  public static String getName(DbUser dbUser) {
    return dbUser.getName();
  }

  public static String getName(Message message) {
    return message.getUserId().getName();
  }

  public static String getName(Inbox inbox) {
    return inbox.getUserId().getName();
  }

  public static Integer getInboxUid(Message message) {
    return message.getInboxUid().getUserId();
  }

  public static Integer getInboxUid(Inbox inbox) {
    return inbox.getInboxUid().getUserId();
  }

  public static String getMessage(Message message) {
    return message.getMessageText();
  }

  public static String getMessage(Inbox inbox) {
    return inbox.getLastMessage().getMessageText();
  }

  public static LocalDateTime getCreatedAt(Message message) {
    return message.getCreatedAt();
  }

  public static LocalDateTime getCreatedAt(Inbox inbox) {
    return inbox.getLastMessage().getCreatedAt();
  }

}