package com.bbm384.badgateway.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;


public class CustomErrorController implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "redirect:/";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}