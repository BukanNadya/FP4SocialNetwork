package com.danit.socialnetwork.security;

import com.danit.socialnetwork.config.GuavaCache;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

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
    http.csrf().disable().headers().frameOptions().disable();

    http.authorizeRequests().antMatchers("/login").permitAll()
        .antMatchers("/h2/**", "/sendLetter", "/activate", "/checkUsername", "/registration", "/").permitAll()
        .antMatchers("/home")
        .authenticated()
        .anyRequest()
        .authenticated();

    http.rememberMe();

    http.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/"));
  }

  // CORS filter
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http.cors(Customizer.withDefaults()) // by default uses a Bean by the name of corsConfigurationSource
        .authorizeRequests(auth -> auth.anyRequest().authenticated()).httpBasic(Customizer.withDefaults()).build();
  }

  // CORS configuration
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT"));
    configuration.setAllowedHeaders(List.of("Authorization"));
    configuration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
