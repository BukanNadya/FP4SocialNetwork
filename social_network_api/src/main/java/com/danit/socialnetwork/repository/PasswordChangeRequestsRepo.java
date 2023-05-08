package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.PasswordChangeRequests;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordChangeRequestsRepo extends JpaRepository<PasswordChangeRequests, String> {
  Optional<PasswordChangeRequests> getPasswordChangeRequestsByChangeRequest(String uuid);


}