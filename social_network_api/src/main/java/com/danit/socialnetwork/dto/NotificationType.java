package com.danit.socialnetwork.dto;

public enum NotificationType {
  POST("post"),
  REPOST("repost"),
  MESSAGE("message");

  private final String type;

  NotificationType(String type) {
    this.type = type;
  }

  public String get() {
    return type;
  }
}
