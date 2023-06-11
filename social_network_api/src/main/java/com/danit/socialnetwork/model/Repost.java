package com.danit.socialnetwork.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "reposts")
@Data
@NoArgsConstructor
public class Repost {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "repost_id")
  private Integer sharedId;

  @Column(name = "reposted_datetime", updatable = false)
  @NonNull
  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime repostedDateTime;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userId;

  @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  private Post postId;



}
