package com.danit.socialnetwork.exception.post;

import com.danit.socialnetwork.exception.user.AppUserError;

public class PostCommentNotFoundException extends AppUserError {
  public PostCommentNotFoundException(String message) {
    super(message);
  }

  public PostCommentNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public PostCommentNotFoundException(Throwable cause) {
    super(cause);
  }
}
