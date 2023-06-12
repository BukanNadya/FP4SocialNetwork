package com.danit.socialnetwork.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
@NonNull
@NoArgsConstructor
@Table(name = "message")
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private Integer messageId;

  @NotEmpty
  @Size(max = 280, message = "280 symbols required")
  @Pattern(regexp = "^[\\p{L}\\p{N}\\p{P}\\p{Zs}\\r\\n]{0,280}$", message = "text required")
  @Column(name = "message")
  private String messageText;

  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "message_reade")
  private Boolean messageReade;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "inbox_uid")
  private DbUser inboxUid;   // inboxUid = sender_id

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userId;     // userId = receiver_id

  public Message(String messageText, @NonNull LocalDateTime createdAt,
                 Boolean messageReade, DbUser inboxUid, DbUser userId) {
    this.messageText = messageText;
    this.createdAt = createdAt;
    this.messageReade = messageReade;
    this.inboxUid = inboxUid;
    this.userId = userId;
  }
}
