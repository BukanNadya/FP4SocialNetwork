package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<DbUser, Integer> {
  DbUser findByUsername(String username);

}
