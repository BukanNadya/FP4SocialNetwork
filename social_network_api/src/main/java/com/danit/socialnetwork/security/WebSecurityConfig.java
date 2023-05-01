package com.danit.socialnetwork.security;

import com.danit.socialnetwork.config.GuavaCache;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Log4j2
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  private final AuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JwtAuthFilter jwtFilter;

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  GuavaCache guavaCache() {
    return new GuavaCache();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .headers().frameOptions().disable();

    http
        .authorizeRequests().antMatchers("/login").permitAll()
        .antMatchers("/h2/**",
            "/sendLetter", "/activate",
            "/checkUsername", "/registration", "/").permitAll()
        .antMatchers("/home").authenticated()
        .anyRequest().authenticated();

    http.rememberMe();

    http
        .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
    http
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    http.logout()
        .logoutRequestMatcher(new AntPathRequestMatcher("/"));
  }
}
