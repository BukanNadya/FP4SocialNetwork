package com.danit.socialnetwork.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Configuration
@PropertySource("classpath:mail.properties")
public class JavaMailSenderConfig {
  @Value("${spring.mail.host}")
  private String host;
  @Value("${spring.mail.username}")
  private String username;
  @Value("${spring.mail.password}")
  private String password;
  @Value("${spring.mail.properties.mail.smtp.port}")
  private Integer port;
  @Value("${spring.mail.properties.mail.smtp.auth}")
  private String auth;
  @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
  private String enable;
  @Value("${mail.debug}")
  private String debug;

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost(host);
    mailSender.setPort(port);

    mailSender.setUsername(username);
    mailSender.setPassword(password);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.smtp.auth", auth);
    props.put("mail.smtp.starttls.enable", enable);
    props.put("mail.debug", debug);

    return mailSender;
  }


}
