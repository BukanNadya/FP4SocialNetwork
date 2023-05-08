package com.danit.socialnetwork.controller;


import com.danit.socialnetwork.controller.mail.MailSender;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;


public class PasswordChanger {
  MailSender mailSender = new MailSender();

  public String change(HttpServletRequest request, String userEmail) {

    String url = request.getRequestURL().toString();

    String uuid = UUID.randomUUID().toString();

    String secretUrl = url + uuid;

    String message = "If you really want to change your current "
        + "password for logging into your Capitweet account, "
        + "please go to the following link and enter "
        + "a new password: \n" + secretUrl;
        

    mailSender.send(userEmail, "Change Capitweet password", message);
    return uuid;
  }
}
