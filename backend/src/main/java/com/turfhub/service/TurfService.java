package com.turfhub.service;

import com.turfhub.dto.TurfRequest;
import com.turfhub.model.Turf;
import com.turfhub.repository.TurfRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurfService {
    private final TurfRepository turfRepository;

    public TurfService(TurfRepository turfRepository) {
        this.turfRepository = turfRepository;
    }

    public List<Turf> search(String city, String sport) {
        if (city != null && sport != null) return turfRepository.findByCityIgnoreCaseAndSportIgnoreCase(city, sport);
        if (city != null) return turfRepository.findByCityIgnoreCase(city);
        if (sport != null) return turfRepository.findBySportIgnoreCase(sport);
        return turfRepository.findAll();
    }

    public Turf findById(Long id) {
        return turfRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Turf not found for id: " + id));
    }

    public Turf create(TurfRequest request) {
        validateGeoCoordinates(request.latitude(), request.longitude());
        Turf turf = Turf.builder()
                .name(request.name().trim())
                .city(request.city().trim())
                .sport(request.sport().trim())
                .address(request.address())
                .latitude(request.latitude())
                .longitude(request.longitude())
                .hourlyRate(request.hourlyRate())
                .available(request.available())
                .build();
        return turfRepository.save(turf);
    }

    public Turf update(Long id, TurfRequest request) {
        validateGeoCoordinates(request.latitude(), request.longitude());
        Turf turf = findById(id);
        turf.setName(request.name().trim());
        turf.setCity(request.city().trim());
        turf.setSport(request.sport().trim());
        turf.setAddress(request.address());
        turf.setLatitude(request.latitude());
        turf.setLongitude(request.longitude());
        turf.setHourlyRate(request.hourlyRate());
        turf.setAvailable(request.available());
        return turfRepository.save(turf);
    }

    public void delete(Long id) {
        if (!turfRepository.existsById(id)) {
            throw new IllegalArgumentException("Turf not found for id: " + id);
        }
        turfRepository.deleteById(id);
    }

    private void validateGeoCoordinates(Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            return;
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new IllegalArgumentException("Invalid coordinates. Latitude must be [-90,90] and longitude must be [-180,180]");
        }
    }
}
