package com.turfhub.service;

import com.turfhub.dto.TurfResponse;
import com.turfhub.model.Turf;
import org.springframework.stereotype.Component;

@Component
public class TurfMapper {
    public TurfResponse toResponse(Turf turf) {
        return new TurfResponse(
                turf.getId(),
                turf.getName(),
                turf.getCity(),
                turf.getSport(),
                turf.getAddress(),
                turf.getLatitude(),
                turf.getLongitude(),
                turf.getHourlyRate(),
                turf.isAvailable()
        );
    }
}
