package com.danit.socialnetwork.controller;


import com.danit.socialnetwork.controller.mail.MailSender;

import java.util.UUID;


public class PasswordChanger {
  MailSender mailSender = new MailSender();

  public String change(String userEmail) {

    String secretCode = UUID.randomUUID().toString().substring(0,8);

    String message = "If you really want to change your current "
        + "password for logging into your Capitweet account, "
        + "enter this code to create "
        + "a new password: \n\n" + secretCode;


    mailSender.send(userEmail, "Change Capitweet password", message);
    return secretCode;
  }
}
