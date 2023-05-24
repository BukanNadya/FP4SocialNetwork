package com.danit.socialnetwork.exception;

import com.danit.socialnetwork.exception.user.AppUserError;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Log4j2
@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> catchNotFoundException(AppUserError exception) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.NOT_FOUND.value());
    error.setMessage(exception.getMessage());
    error.setTimeStamp(System.currentTimeMillis());
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> catchIllegalArgumentException(RuntimeException exception) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.NOT_FOUND.value());
    error.setMessage(exception.getMessage());
    error.setTimeStamp(System.currentTimeMillis());
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }
}
