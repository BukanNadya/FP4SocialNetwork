package com.danit.socialnetwork.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor(force = true)
@Table(name = "notifications")
public class Notification {
  @Id
  @Column(name = "n_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Integer notificationId;

  @Column(name = "user_id")
  @NotNull
  Integer userId;

  @Column(name = "following_user_id")
  @NotNull
  Integer followingUserId;

  @Column(name = "notidication")
  @NotNull
  String notificationText;

  @CreationTimestamp
  @Column(name = "created_at")
  Timestamp dateTime;

  public Notification(Integer userId, Integer followingUserId, String notificationText) {
    this.userId = userId;
    this.followingUserId = followingUserId;
    this.notificationText = notificationText;
  }
}
