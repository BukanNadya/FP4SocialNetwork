package com.danit.socialnetwork.exception;

import com.danit.socialnetwork.exception.user.AppUserError;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.MethodArgumentNotValidException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;


class GlobalExceptionHandlerTest {

  @Test
  void testCatchNotFoundException_ReturnsNotFoundResponse() {

    GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();
    Exception exception = new AppUserError("User not found");

    ResponseEntity<ErrorResponse> response = globalExceptionHandler.catchNotFoundException(exception);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    ErrorResponse errorResponse = response.getBody();
    assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.getStatus());
    assertEquals("User not found", errorResponse.getMessage());

  }


  @Test
  void testHandleValidationExceptions_ReturnsBadRequestResponse() {

    GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();
    MethodArgumentNotValidException exception = mock(MethodArgumentNotValidException.class);
    String errorMessage = "Validation error message";
    Mockito.when(exception.getMessage()).thenReturn(errorMessage);

    ResponseEntity<ErrorResponse> response = globalExceptionHandler.handleValidationExceptions(exception);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    ErrorResponse errorResponse = response.getBody();
    assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.getStatus());
    assertEquals(errorMessage, errorResponse.getMessage());

  }


}
