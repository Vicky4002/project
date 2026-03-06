package com.turfhub.dto;

import java.time.LocalDateTime;

public record EventResponse(
        Long id,
        String title,
        String city,
        String venue,
        Double latitude,
        Double longitude,
        LocalDateTime startsAt,
        double distanceKm
) {}
