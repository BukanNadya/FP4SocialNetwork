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

  @CreationTimestamp
  @Column(name = "created_at")
  Timestamp dateTime;

  @Column(name = "follower_user_id")
  @NotNull
  Integer followerUserId;

  @Column(name = "event_type")
  @NotNull
  String eventType;

  @Column(name = "event_id")
  @NotNull
  Integer eventId;

  @Column(name = "following_user_id")
  @NotNull
  Integer followingUserId;

  @Column(name = "following_user_name")
  @NotNull
  String followingUserName;

  @Column(name = "following_user_photo_link")
  @NotNull
  String followingUserPhoto;

  @Column(name = "notification")
  @NotNull
  String notificationText;

  @Column(name = "notification_read")
  private Boolean notificationRead;


  public Notification(Integer followerUserId, String eventType, Integer eventId,
                      Integer followingUserId, String followingUserName,
                      String followingUserPhoto, String notificationText) {
    this.followerUserId = followerUserId;
    this.eventType = eventType;
    this.eventId = eventId;
    this.followingUserId = followingUserId;
    this.followingUserName = followingUserName;
    this.followingUserPhoto = followingUserPhoto;
    this.notificationText = notificationText;
    this.notificationRead = false;
  }
}
