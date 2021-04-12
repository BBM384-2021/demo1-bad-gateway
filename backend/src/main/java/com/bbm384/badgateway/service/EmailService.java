package com.bbm384.badgateway.service;

import com.bbm384.badgateway.config.EmailConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private EmailConfig emailConfig;


    public void sendMail(String to, String subject, String body)
    {
        JavaMailSender mailSender = emailConfig.getJavaMailSender();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ozdemir.umut98@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
