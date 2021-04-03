package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${app.api_path}/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    public MessageController(){}

}