package com.bbm384.badgateway.payload;

public class NormaUserSummary {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private boolean isPasswordReset;
    private long unreadNotificationCount;

    public NormaUserSummary(Long id, String username, String name, String email, String phone,boolean isPasswordReset,
                            long unreadNotificationCount) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.isPasswordReset = isPasswordReset;
        this.unreadNotificationCount = unreadNotificationCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public long getUnreadNotificationCount() {
        return unreadNotificationCount;
    }

    public void setUnreadNotificationCount(long unreadNotificationCount) {
        this.unreadNotificationCount = unreadNotificationCount;
    }

    public boolean isPasswordReset() {
        return isPasswordReset;
    }

    public void setPasswordReset(boolean passwordReset) {
        isPasswordReset = passwordReset;
    }

}
