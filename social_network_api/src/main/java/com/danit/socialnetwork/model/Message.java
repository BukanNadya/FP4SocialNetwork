package com.danit.socialnetwork.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

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

@Entity(name = "messages")
@Data
@NonNull
@NoArgsConstructor(force = true)
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private Integer messageId;

  @Column(name = "inbox__uid")
  private Integer inboxUid;   // inboxUid = sender_id
  @Column(name = "user__id")
  private Integer userId;     // userId = receiver_id
  @Column(name = "message")
  private String message;
  @Column(name = "created_at", updatable = false)
  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime createdAt;

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "Message_DbUser",
      joinColumns = { @JoinColumn(name = "user__id") },
      inverseJoinColumns = { @JoinColumn(name = "user_id") })
  Set<DbUser> dbUsers = new HashSet<>();

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "Message_Inbox",
      joinColumns = { @JoinColumn(name = "inbox__uid") },
      inverseJoinColumns = { @JoinColumn(name = "inbox_uid") })
  Set<Inbox> inboxes = new HashSet<>();

  @ManyToMany(mappedBy = "messagess")
  private Set<Inbox> inboxess = new HashSet<>();

  public Message(int inboxUid, int userId, String message, LocalDateTime createdAt) {
    this.inboxUid = inboxUid;
    this.userId = userId;
    this.message = message;
    this.createdAt = createdAt;
  }
}
