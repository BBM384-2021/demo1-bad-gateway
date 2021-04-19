package com.bbm384.badgateway.payload;

public class CategoryPayload {
    private Long id;
    private String name;

    public CategoryPayload(String name) {
        this.name = name;
    }

    public CategoryPayload() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
