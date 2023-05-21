package com.danit.socialnetwork.security;

import com.google.common.net.HttpHeaders;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class JwtAuthFilterTest {
  @Mock
  JwtTokenService tokenService;

  @InjectMocks
  private JwtAuthFilter filter;

  @Mock
  private MockHttpServletRequest request;

  @Mock
  private MockHttpServletResponse response;

  @Mock
  private FilterChain filterChain;

  @Before
  public void setUp() {
    request.clearAttributes();
    response.reset();
  }

  @Test
  void doFilterInternal() throws ServletException, IOException {
    // Create a JWT token
    String token = tokenService.generateToken(123, true);

    // Set up a default authentication object
    JwtUserDetails jwtUserDetails = new JwtUserDetails(123);
    Authentication authentication = new UsernamePasswordAuthenticationToken(
        123, null, jwtUserDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Set the token in the request header
    request.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);

    // Call the filter
    filter.doFilterInternal(request, response, filterChain);

    // Check that the authentication was successful
    authentication = SecurityContextHolder.getContext().getAuthentication();
    assertTrue(authentication.isAuthenticated());
  }
}
