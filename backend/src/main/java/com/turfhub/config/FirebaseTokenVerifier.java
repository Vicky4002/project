package com.turfhub.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Component;

@Component
public class FirebaseTokenVerifier {
    public FirebaseToken verify(String token) {
        try {
            return FirebaseAuth.getInstance().verifyIdToken(token);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid Firebase token", ex);
        }
    }
}
