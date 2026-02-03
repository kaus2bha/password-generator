package com.example.PasswordGenerator.Model;

public class passwordResponse {

    private String password;
    private String strength;

    public passwordResponse(String password, String strength) {
        this.password = password;
        this.strength = strength;
    }

    public String getPassword() {
        return password;
    }

    public String getStrength() {
        return strength;
    }
}
