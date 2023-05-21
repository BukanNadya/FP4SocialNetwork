package com.danit.socialnetwork.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtTokenServiceTest {
  @InjectMocks
  JwtTokenService jwtTokenService = new JwtTokenService();

  @Test
  void generateToken() {
    int userId = 123;
    String token = jwtTokenService.generateToken(userId, true);
    Optional<Jws<Claims>> claims = jwtTokenService.tokenToClaims(token);

    assertTrue(claims.isPresent());
    assertEquals(Optional.of(userId), Optional.of(
        jwtTokenService.extractTokenFromClaims(claims.get()).get()));
  }

  @Test
  void tokenToClaims() {
      int userId = 123;
      String token = jwtTokenService.generateToken(userId, true);
      Optional<Jws<Claims>> claims = jwtTokenService.tokenToClaims(token);

      assertTrue(claims.isPresent());
      assertEquals(userId, Integer.parseInt(claims.get().getBody().getSubject()));
  }

  @Test
  void extractTokenFromClaims() {
    String token = jwtTokenService.generateToken(123, true);
    Optional<Jws<Claims>> claims = jwtTokenService.tokenToClaims(token);
    Optional<Integer> userId = jwtTokenService.extractTokenFromClaims(claims.get());

    assertTrue(claims.isPresent());
    assertTrue(userId.isPresent());
    assertEquals(Optional.of(123), Optional.of(userId.get()));
  }

}