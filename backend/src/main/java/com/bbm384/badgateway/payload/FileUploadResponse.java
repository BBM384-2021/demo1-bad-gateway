package com.bbm384.badgateway.payload;

import java.util.List;
import java.util.Map;


public class FileUploadResponse {
    private Boolean success;
    private Map<Integer, List<String>> errorList;
    private Integer errorCount;

    public Integer getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Integer errorCount) {
        this.errorCount = errorCount;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Map<Integer, List<String>> getErrorList() {
        return errorList;
    }

    public void setErrorList(Map<Integer, List<String>> errorList) {
        this.errorList = errorList;
    }
}
