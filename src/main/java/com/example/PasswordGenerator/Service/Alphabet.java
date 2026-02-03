package com.example.PasswordGenerator.Service;

public class Alphabet {

    private final String alphabet;

    public Alphabet(boolean upper, boolean lower, boolean numbers, boolean symbols) {

        StringBuilder pool = new StringBuilder();

        if (upper) pool.append("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        if (lower) pool.append("abcdefghijklmnopqrstuvwxyz");
        if (numbers) pool.append("0123456789");
        if (symbols) pool.append("!@#$%^&*()-_=+");

        if (pool.isEmpty()) {
            throw new IllegalArgumentException("At least one character set must be selected");
        }

        this.alphabet = pool.toString();
    }

    public String getAlphabet() {
        return alphabet;
    }
}
