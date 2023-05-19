package com.danit.socialnetwork.exception.post;

import com.danit.socialnetwork.exception.user.AppUserError;

public class PostNotFoundException extends AppUserError {
  public PostNotFoundException(String message) {
    super(message);
  }

  public PostNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public PostNotFoundException(Throwable cause) {
    super(cause);
  }
}
