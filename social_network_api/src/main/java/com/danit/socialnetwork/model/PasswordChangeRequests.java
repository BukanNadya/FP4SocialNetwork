package com.danit.socialnetwork.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor(force = true)
@Table(name = "pass_change_requests")
public class PasswordChangeRequests {

  @Id
  @Column(name = "email")
  @NotNull
  String email;

  @Column(name = "request")
  @NotNull
  String changeRequest;


  @CreationTimestamp
  @Column(name = "created_at")
  Timestamp dateTime;
}