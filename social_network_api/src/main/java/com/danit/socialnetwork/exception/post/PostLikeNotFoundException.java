package com.danit.socialnetwork.exception.post;

import com.danit.socialnetwork.exception.user.AppUserError;

public class PostLikeNotFoundException extends AppUserError {
  public PostLikeNotFoundException(String message) {
    super(message);
  }

  public PostLikeNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public PostLikeNotFoundException(Throwable cause) {
    super(cause);
  }
}
