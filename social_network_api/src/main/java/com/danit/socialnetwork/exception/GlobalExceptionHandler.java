package com.danit.socialnetwork.exception;

import com.danit.socialnetwork.exception.user.AppUserError;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

@Log4j2
@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler ({AppUserError.class, RuntimeException.class})
  public ResponseEntity<ErrorResponse> catchNotFoundException(Exception exception) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.NOT_FOUND.value());
    error.setMessage(exception.getMessage());
    error.setTimeStamp(System.currentTimeMillis());
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
  public ResponseEntity<ErrorResponse> handleValidationExceptions(Exception exception) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.BAD_REQUEST.value());
    error.setMessage(exception.getMessage());
    error.setTimeStamp(System.currentTimeMillis());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

}
