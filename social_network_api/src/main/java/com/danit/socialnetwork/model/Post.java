package com.danit.socialnetwork.model;

import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;


@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "p_id")
  private Integer postId;

  @Size(max = 280, message = "280 symbols required")
  @Column(name = "written_text")
  private String writtenText;

  @Column(name = "photo_file")
  private String photoFile;

  @Column(name = "sent_datetime", updatable = false)
  @NonNull
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime sentDateTime;

  @Column(name = "view_count")
  private Integer viewCount;

  @OneToMany(mappedBy = "postCommentId", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<PostComment> postComments;

  @OneToMany(mappedBy = "postLikeId", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<PostLike> postLikes;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userPost;

  public DbUser getUserPost() {
    return userPost;
  }

  public static Post from(PostDtoSave postDtoSave, DbUser userPost) {
    Post tempPost = new Post();
    tempPost.setPostId(0);
    ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneOffset.UTC);
    LocalDateTime utcDateTime = currentDateTime.toLocalDateTime();
    tempPost.setSentDateTime(utcDateTime);
    tempPost.setPhotoFile(null);
    tempPost.setWrittenText(postDtoSave.getWrittenText());
    tempPost.setUserPost(userPost);
    return tempPost;
  }

  public static Post fromWithPhotoFileUrl(Post post, String photoFile) {
    post.setPhotoFile(photoFile);
    return post;
  }


}
