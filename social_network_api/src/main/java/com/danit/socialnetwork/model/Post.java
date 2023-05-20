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
import java.time.LocalDateTime;
import java.util.Base64;
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

  @Column(name = "written_text")
  private String writtenText;

  @Column(name = "photo_file", columnDefinition = "text")
  private String photoFile;

  @Column(name = "sent_datetime", updatable = false)
  @NonNull
  @CreationTimestamp
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy:MM:dd HH:mm:ss")
  private LocalDateTime sentDateTime;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "postID", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<PostComment> postComments;

  @ManyToOne(targetEntity = DbUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private DbUser userPost;

  public static Post from(PostDtoSave postDtoSave, DbUser userPost) {
    Post tempPost = new Post();
    tempPost.setPostId(0);
    tempPost.setSentDateTime(LocalDateTime.now());
    tempPost.setWrittenText(postDtoSave.getWrittenText());
    tempPost.setPhotoFile(Base64.getEncoder()
        .encodeToString(postDtoSave.getPhotoFileByteArray()));
    tempPost.setUserPost(userPost);
    return tempPost;
  }


}
