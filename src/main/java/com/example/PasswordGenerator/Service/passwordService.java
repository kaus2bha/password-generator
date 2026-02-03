package com.example.PasswordGenerator.Service;

import com.example.PasswordGenerator.Model.User;
import com.example.PasswordGenerator.Repository.UserRepository;
import com.example.PasswordGenerator.Security.passwordHasher;
import com.example.PasswordGenerator.Security.passwordVerifier;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class passwordService {

    private final UserRepository userRepository;

    public passwordService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // PASSWORD GENERATION (FIXES YOUR ERROR)
    public String generatePassword(int length, Alphabet alphabet) {

        if (length < 8) {
            throw new IllegalArgumentException("Password length must be at least 8");
        }

        SecureRandom random = new SecureRandom();
        String pool = alphabet.getAlphabet();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(pool.length());
            password.append(pool.charAt(index));
        }

        return password.toString();
    }

    // USER REGISTRATION
    public void register(String username, String rawPassword) {

        byte[] salt = passwordHasher.generateSalt();
        String hash = passwordHasher.hashPassword(rawPassword.toCharArray(), salt);

        User user = new User(
                username,
                hash,
                passwordHasher.encodeSalt(salt)
        );

        userRepository.save(user);
    }

    // LOGIN VERIFICATION
    public boolean login(String username, String rawPassword) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return passwordVerifier.verify(
                rawPassword,
                user.getPasswordHash(),
                user.getSalt()
        );
    }
}
