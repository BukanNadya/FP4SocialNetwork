package com.danit.socialnetwork.exception.user;

public class PhotoNotFoundException extends AppUserError {
  public PhotoNotFoundException(String message) {
    super(message);
  }

  public PhotoNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public PhotoNotFoundException(Throwable cause) {
    super(cause);
  }
}
