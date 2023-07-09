package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.model.Message;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

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
    Message message = inbox.getLastMessage();
    if (message == null) {
      return null;
    }
    return message.getMessageText();
  }

  public static LocalDateTime getCreatedAt(Message message, String userTimeZone) {
    ZoneId utcZoneId = ZoneId.of("UTC"); // The stored time is in UTC
    ZoneId userZoneId = ZoneId.of(userTimeZone);

    ZonedDateTime utcDateTimeRepost = message.getCreatedAt().atZone(utcZoneId);
    ZonedDateTime userDateTimeMessage = utcDateTimeRepost.withZoneSameInstant(userZoneId);
    return userDateTimeMessage.toLocalDateTime();
  }

  public static LocalDateTime getCreatedAt(Inbox inbox, String userTimeZone) {
    Message message = inbox.getLastMessage();
    if (message == null) {
      return null;
    }
    ZoneId utcZoneId = ZoneId.of("UTC"); // The stored time is in UTC
    ZoneId userZoneId = ZoneId.of(userTimeZone);

    ZonedDateTime utcDateTimeRepost = message.getCreatedAt().atZone(utcZoneId);
    ZonedDateTime userDateTimeMessage = utcDateTimeRepost.withZoneSameInstant(userZoneId);
    return userDateTimeMessage.toLocalDateTime();
  }

  public static Integer getInboxId(Inbox inbox) {
    return inbox.getInboxId();
  }

  public static Integer getMessageId(Inbox inbox) {
    Message message = inbox.getLastMessage();
    if (message == null) {
      return null;
    }
    return message.getMessageId();
  }

  public static Integer getMessageId(Message message) {
    return message.getMessageId();
  }

}