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

    public Turf create(TurfRequest request) {
        Turf turf = Turf.builder()
                .name(request.name())
                .city(request.city())
                .sport(request.sport())
                .address(request.address())
                .latitude(request.latitude())
                .longitude(request.longitude())
                .hourlyRate(request.hourlyRate())
                .available(request.available())
                .build();
        return turfRepository.save(turf);
    }

    public Turf update(Long id, TurfRequest request) {
        Turf turf = turfRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Turf not found"));
        turf.setName(request.name());
        turf.setCity(request.city());
        turf.setSport(request.sport());
        turf.setAddress(request.address());
        turf.setLatitude(request.latitude());
        turf.setLongitude(request.longitude());
        turf.setHourlyRate(request.hourlyRate());
        turf.setAvailable(request.available());
        return turfRepository.save(turf);
    }

    public void delete(Long id) {
        turfRepository.deleteById(id);
    }
}
