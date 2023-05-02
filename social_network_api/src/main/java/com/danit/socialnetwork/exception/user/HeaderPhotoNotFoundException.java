package com.danit.socialnetwork.exception.user;

public class HeaderPhotoNotFoundException extends AppUserError {
  public HeaderPhotoNotFoundException(String message) {
    super(message);
  }

  public HeaderPhotoNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public HeaderPhotoNotFoundException(Throwable cause) {
    super(cause);
  }
}
