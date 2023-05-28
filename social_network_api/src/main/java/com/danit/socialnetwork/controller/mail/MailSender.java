package com.danit.socialnetwork.controller.mail;

import lombok.extern.log4j.Log4j2;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Log4j2
public class MailSender {

  public void send(String recipientEmail, String caption, String messageText) {
    String username = "socialnetwork897@gmail.com"; // "capitweet.info@gmail.com";
    String pass = "syqscxxgtkypnmxl"; // пароли приложений "qxgjmpeeqjnslefd"

    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", 465); //587 465
    props.put("mail.smtp.ssl.enable", "true");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");


    Session session = Session.getInstance(props, new Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, pass);
      }
    });

    try {
      Message message = new MimeMessage(session);
      message.setFrom(new InternetAddress("capitweet.info@gmail.comggg"));
      message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
      message.setSubject(caption);
      message.setText(messageText);

      Transport.send(message);
      log.info("Email sent successfully!");

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }
}
