package com.example.PasswordGenerator.Analysis;

public class passwordStrengthChecker {

    public static passwordStrength evaluate(String password) {

        int score = 0;

        if (password.length() >= 8) score++;
        if (password.matches(".*[A-Z].*")) score++;
        if (password.matches(".*[a-z].*")) score++;
        if (password.matches(".*\\d.*")) score++;
        if (password.matches(".*[^a-zA-Z0-9].*")) score++;

        if (score <= 2) return passwordStrength.WEAK;
        if (score <= 4) return passwordStrength.MEDIUM;
        return passwordStrength.STRONG;
    }
}
