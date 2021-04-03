package com.bbm384.badgateway.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "file")
public class StorageProperties {
    private String uploadDir;
    private String letterSourceDir;
    private String letterArchiveDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public String getLetterSourceDir() {
        return letterSourceDir;
    }

    public void setLetterSourceDir(String letterSourceDir) {
        this.letterSourceDir = letterSourceDir;
    }

    public String getLetterArchiveDir() {
        return letterArchiveDir;
    }

    public void setLetterArchiveDir(String letterArchiveDir) {
        this.letterArchiveDir = letterArchiveDir;
    }
}