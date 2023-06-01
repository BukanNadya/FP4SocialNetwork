package com.danit.socialnetwork.exception.post;

import com.danit.socialnetwork.exception.user.AppUserError;

public class RepostNotFoundException extends AppUserError {
  public RepostNotFoundException(String message) {
    super(message);
  }

  public RepostNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public RepostNotFoundException(Throwable cause) {
    super(cause);
  }
}
