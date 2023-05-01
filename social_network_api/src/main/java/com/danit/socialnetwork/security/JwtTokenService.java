package com.danit.socialnetwork.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Log4j2
@Service
@PropertySource("classpath:jwt.properties")
public class JwtTokenService {

  @Value("${jwt.secret}")
  private String jwtSecret = "SGVsbG9Xb3JsZA==";

  @Value("${jwt.expire.normal}")
  private Long expirationNormal = 60 * 60 * 24 * 1000L; // 1d

  @Value("${jwt.expire.remember}")
  Long expirationRemember = 60 * 60 * 24 * 1000L * 10; // 10d

  public String generateToken(String username, String password, boolean rememberMe) {
    String subject = username + password;
    Date now = new Date();
    Date expiry = new Date(now.getTime() + (rememberMe ? expirationRemember : expirationNormal));
    String token = Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expiry)
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
    log.info("Token " + token);

    return token;
  }

  public Optional<Jws<Claims>> tokenToClaims(String token) {
    try {
      return Optional.of(Jwts.parser()
          .setSigningKey(jwtSecret)
          .parseClaimsJws(token));
    } catch (Exception x) {
      log.error(getClass() + " Exception" + x);
    }
    return Optional.empty();
  }

  public Optional<String> extractTokenFromClaims(Jws<Claims> claims) {
    try {
      return Optional
          .of(claims.getBody().getSubject());
    } catch (Exception x) {
      return Optional.empty();
    }
  }

}
