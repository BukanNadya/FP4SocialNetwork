package com.danit.socialnetwork.security;

import com.google.common.net.HttpHeaders;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.FilterChain;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JwtAuthFilterTest {

  @Autowired
  private JwtTokenService tokenService;

  @Autowired
  private JwtAuthFilter filter;

  @MockBean
  private MockHttpServletRequest request;

  @MockBean
  private MockHttpServletResponse response;

  @MockBean
  private FilterChain filterChain;

  @Before
  public void setUp() {
    request.clearAttributes();
    response.reset();
  }

  @Test
  public void testDoFilterInternal() throws Exception {
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