package com.danit.socialnetwork.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
  private static final String BEARER = "Bearer ";
  private final JwtTokenService tokenService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    try {
      extractTokenFromRequest(request)
          .flatMap(tokenService::tokenToClaims)
          .flatMap(tokenService::extractTokenFromClaims)
          .map(id -> new JwtUserDetails(id))
          .map(ud -> new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities()))
          .ifPresent((UsernamePasswordAuthenticationToken auth) -> {
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
          });

      filterChain.doFilter(request, response);
    } catch (Exception x) {
      log.error(getClass() + " doFilterInternal Exception", x);
    }

  }

  private Optional<String> extractTokenFromRequest(HttpServletRequest request) {
    return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
        .filter(h -> h.startsWith(BEARER))
        .map(h -> h.substring(BEARER.length()));
  }
}
