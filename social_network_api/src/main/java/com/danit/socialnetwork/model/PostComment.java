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
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "post_comments")
public class PostComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "post_comment_id")
  private Integer postCommentId;

  @Column(name = "created_datetime", updatable = false)
  @NonNull
  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime createdDateTime;

  @Column(name = "comment_text")
  @Pattern(regexp = "^[A-Z]{1,280}$", message = "Invalid input")
  private String commentText;

  @ManyToOne(targetEntity = DbUser.class)
  @JoinColumn(name = "user_id")
  private DbUser userPostComment;

}
