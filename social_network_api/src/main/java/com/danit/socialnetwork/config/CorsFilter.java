package com.danit.socialnetwork.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@PropertySource("classpath:deploy.properties")
public class CorsFilter implements Filter {

  @Value("${uiUrl}")
  private String uiUrl;

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                       FilterChain filterChain) throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    response.setHeader("Access-Control-Allow-Origin", uiUrl);
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    if (request.getMethod().equals("OPTIONS")) {
      response.setStatus(HttpServletResponse.SC_ACCEPTED);
    }
    filterChain.doFilter(servletRequest, servletResponse);
  }
}