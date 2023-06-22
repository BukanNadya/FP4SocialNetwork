package com.danit.socialnetwork.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;

@Entity(name = "inbox")
@Data
@NonNull
@NoArgsConstructor(force = true)
public class Inbox {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inbox_id")
  private Integer inboxId;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "inbox_uid")
  private DbUser inboxUid;   // inboxUid = sender_id

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userId;     // userId = receiver_id

  @ManyToOne(targetEntity = Message.class, fetch = FetchType.EAGER)
  @JoinColumn(name = "last_message")
  private Message lastMessage;

  @Column(name = "unread")
  private Integer unread;

  public Inbox(DbUser inboxUid, DbUser userId, Message lastMessage, Integer unread) {
    this.inboxUid = inboxUid;
    this.userId = userId;
    this.lastMessage = lastMessage;
    this.unread = unread;
  }
}
