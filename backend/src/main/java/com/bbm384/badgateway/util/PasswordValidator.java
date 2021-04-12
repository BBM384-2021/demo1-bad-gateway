package com.bbm384.badgateway.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {
    private final Pattern pattern;

    private static final String PASSWORD_PATTERN = "((?=.*[a-zA-Z])(?=.*\\d)(?=.*[@#$?_%!]).{8,100})";

    public PasswordValidator() {
        pattern = Pattern.compile(PASSWORD_PATTERN);
    }

    public boolean validate(final String password) {
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

}
