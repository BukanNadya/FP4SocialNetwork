package com.danit.socialnetwork.exception.user;

public class AppUserError extends RuntimeException {

  public AppUserError(String message) {
    super(message);
  }

  public AppUserError(String message, Throwable cause) {
    super(message, cause);
  }

  public AppUserError(Throwable cause) {
    super(cause);
  }
}
