package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<DbUser, Integer> {
  Optional<DbUser> findByUsername(String username);

  Optional<DbUser> findDbUserByEmail(String email);
}
