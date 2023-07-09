package com.danit.socialnetwork.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
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
  private LocalDateTime createdDateTime;

  @NotEmpty
  @Size(max = 280, message = "280 symbols required")
  @Pattern(regexp = "^[\\p{L}\\p{N}\\p{P}\\p{Zs}\\r\\n]{0,280}$", message = "text required")
  @Column(name = "comment_text")
  private String commentText;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userId;

  @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  private Post postId;

}
