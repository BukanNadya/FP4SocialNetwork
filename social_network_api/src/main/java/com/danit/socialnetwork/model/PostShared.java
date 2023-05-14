package com.danit.socialnetwork.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "post_shared")
@Data
@NoArgsConstructor
public class PostShared {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "post_shared_id")
  private Integer postLikeId;

  @Column(name = "created_datetime", updatable = false)
  @NonNull
  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime createdDateTime;

  @ManyToOne(targetEntity = DbUser.class)
  @JoinColumn(name = "user_id")
  private DbUser userPostShared;
}
