package com.example.PasswordGenerator.controller;

import com.example.PasswordGenerator.Analysis.passwordStrength;
import com.example.PasswordGenerator.Analysis.passwordStrengthChecker;
import com.example.PasswordGenerator.Model.LoginRequest;
import com.example.PasswordGenerator.Model.passwordRequest;
import com.example.PasswordGenerator.Model.passwordResponse;
import com.example.PasswordGenerator.Security.JwtUtil;
import com.example.PasswordGenerator.Service.Alphabet;
import com.example.PasswordGenerator.Service.passwordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "http://localhost:5173")
public class passwordController {

    private final passwordService service;

    // Constructor Injection (CORRECT)
    public passwordController(passwordService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public passwordResponse generate(@RequestBody passwordRequest request) {

        Alphabet alphabet = new Alphabet(
                request.isIncludeUpper(),
                request.isIncludeLower(),
                request.isIncludeNumbers(),
                request.isIncludeSymbols()
        );

        String password = service.generatePassword(
                request.getLength(),
                alphabet
        );

        passwordStrength strength =
                passwordStrengthChecker.evaluate(password);

        return new passwordResponse(password, strength.name());
    }



    @GetMapping("/health")
    public String health() {
        return "Password Generator Backend is running";
    }

    @PostMapping("/register")
    public String register(@RequestBody LoginRequest request) {

        service.register(
                request.getUsername(),
                request.getPassword()
        );

        return "User registered successfully";
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        boolean success = service.login(
                request.getUsername(),
                request.getPassword()
        );

        if (!success) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = JwtUtil.generateToken(request.getUsername());

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }

}
