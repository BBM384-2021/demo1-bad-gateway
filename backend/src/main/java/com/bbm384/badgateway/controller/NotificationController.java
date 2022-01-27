package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${app.api_path}")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    public NotificationController(){}

}