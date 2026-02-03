package com.example.PasswordGenerator.Security;

public class passwordVerifier {

    public static boolean verify(String rawPassword,
                                 String storedHash,
                                 String storedSalt) {

        byte[] salt = passwordHasher.decodeSalt(storedSalt);
        String hashToVerify =
                passwordHasher.hashPassword(rawPassword.toCharArray(), salt);

        return hashToVerify.equals(storedHash);
    }
}
