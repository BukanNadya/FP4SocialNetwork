package com.danit.socialnetwork.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user_follows")
public class UserFollower {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_follow_id")
  private Integer userFollowId;

  /*userFollowingId defines who user follows*/
  @ManyToOne(targetEntity = DbUser.class)
  @JoinColumn(name = "user_following_id")
  private DbUser userFollowingId;

  /*userFollowerId defines who follow user*/
  @ManyToOne(targetEntity = DbUser.class)
  @JoinColumn(name = "user_follower_id")
  private DbUser userFollowerId;

  /*receivedNotificationPost by default false that means not to receive notification
  if true it means to receive notification*/
  @Column(name = "received_notification_post")
  private Boolean receivedNotificationPost;


}
