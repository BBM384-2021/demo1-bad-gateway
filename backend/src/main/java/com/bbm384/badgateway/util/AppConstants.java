package com.bbm384.badgateway.util;


public interface AppConstants {
    String DEFAULT_PAGE_NUMBER = "0";

    int DEFAULT_PAGE_SIZE = 10;
    int CENTRAL_LETTERS_PAGE_SIZE = 100;
    int MESSAGE_PAGE_SIZE = 15;
    int MAX_PAGE_SIZE = 50;
    String TEXT_PLAIN = "text/plain";
    String TEXT_CSV = "text/csv";
    String FILE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    String FILE_XLS = "application/vnd.ms-excel";
    String FILE_PDF = "application/pdf";
    String FILE_PNG = "image/png";
    String FILE_JPEG = "image/jpeg";
    int MAX_FILE_SIZE = 5;

    String FILE_LATEST = "1";
    String FILE_ORIGINAL = "2";
    String FILE_FIXED_WIDTH = "3";

    String DOWNLOADED_LETTERS = "1";
    String NOT_DOWNLOADED_LETTERS = "2";
    String ALL_LETTERS = "3";
}
