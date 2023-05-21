package com.danit.socialnetwork.model;

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
import java.util.HashSet;
import java.util.Set;

@Entity(name = "inbox_participants")
@Data
@NonNull
@NoArgsConstructor(force = true)
public class InboxParticipants {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inbox_participants_id")
  private Integer inboxParticipantsId;
  @Column(name = "user__id")
  private Integer userId;     // userId = receiver_id
  @Column(name = "inbox__uid")
  private Integer inboxUid;   // inboxUid = sender_id

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "inbox_participants__DbUser",
      joinColumns = { @JoinColumn(name = "user__id") },
      inverseJoinColumns = { @JoinColumn(name = "user_id") })
  Set<DbUser> dbUsers = new HashSet<>();

  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(
      name = "inbox_participants__Inbox",
      joinColumns = { @JoinColumn(name = "inbox__uid") },
      inverseJoinColumns = { @JoinColumn(name = "inbox_uid") })
  Set<Inbox> inboxes = new HashSet<>();

  public InboxParticipants(Integer userId, Integer inboxUid) {
    this.userId = userId;
    this.inboxUid = inboxUid;
  }
}
