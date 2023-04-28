package com.danit.socialnetwork.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "users")
@Data
@NoArgsConstructor
public class DbUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "username")
  @NonNull
  private String username;

  @Column(name = "passwords")
  @NonNull
  private String password;

  @Column(name = "email")
  @NonNull
  private String email;

  @Column(name = "created_date")
  @NonNull
  @CreationTimestamp
  private LocalDateTime createdDate;

  @Column(name = "name")
  @NonNull
  private String name;

  @Column(name = "dateOfBirth")
  @NonNull
  private LocalDate dateOfBirth;

  @Column(name = "profile_background_image_url")
  private String profileBackgroundImageUrl;

  @Column(name = "profile_image_url")
  private String profileImageUrl;

}
