package com.turfhub.dto;

import jakarta.validation.constraints.*;

public record TurfRequest(
        @NotBlank String name,
        @NotBlank String city,
        @NotBlank String sport,
        String address,
        Double latitude,
        Double longitude,
        @PositiveOrZero Double hourlyRate,
        boolean available
) {}
