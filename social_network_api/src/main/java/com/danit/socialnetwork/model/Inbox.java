package com.danit.socialnetwork.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.ManyToMany;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "inbox")
@Data
@NonNull
@NoArgsConstructor(force = true)
public class Inbox {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inbox_id")
  private Integer inboxId;
  @Column(name = "inbox_uid")
  private Integer inboxUid;   // inboxUid = sender_id
  @Column(name = "last_message")
  private String lastMessage;
  @Column(name = "created__at")
  private LocalDateTime createdAt;
  @Column(name = "last_sent_user_id")
  private Integer lastSentUserId;

  @ManyToMany(mappedBy = "inboxes")
  private Set<Message> messages = new HashSet<>();

  @ManyToMany(mappedBy = "inboxes")
  private Set<InboxParticipants> inboxParticipants = new HashSet<>();

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "Inbox_DbUser",
      joinColumns = { @JoinColumn(name = "last_sent_user_id") },
      inverseJoinColumns = { @JoinColumn(name = "user_id") })
  Set<DbUser> dbUsers = new HashSet<>();

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "Inbox_Message",
      joinColumns = { @JoinColumn(name = "created__at") },
      inverseJoinColumns = { @JoinColumn(name = "created_at") })
  Set<Message> messagess = new HashSet<>();

  public Inbox(Integer inboxUid, String lastMessage, Integer lastSentUserId) {
    this.inboxUid = inboxUid;
    this.lastMessage = lastMessage;
    this.lastSentUserId = lastSentUserId;
  }
}
