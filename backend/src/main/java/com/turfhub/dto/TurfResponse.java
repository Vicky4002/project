package com.turfhub.dto;

public record TurfResponse(
        Long id,
        String name,
        String city,
        String sport,
        String address,
        Double latitude,
        Double longitude,
        Double hourlyRate,
        boolean available
) {}
