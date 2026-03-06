package com.turfhub.service;

import com.turfhub.dto.EventResponse;
import com.turfhub.model.Event;
import com.turfhub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final GeoService geoService;

    public EventService(EventRepository eventRepository, GeoService geoService) {
        this.eventRepository = eventRepository;
        this.geoService = geoService;
    }

    public List<EventResponse> nearbyEvents(double lat, double lon, double radiusKm) {
        return eventRepository.findAll().stream()
                .filter(e -> e.getLatitude() != null && e.getLongitude() != null)
                .map(e -> mapDistance(e, lat, lon))
                .filter(e -> e.distanceKm() <= radiusKm)
                .sorted(Comparator.comparingDouble(EventResponse::distanceKm))
                .toList();
    }

    private EventResponse mapDistance(Event event, double lat, double lon) {
        double distance = geoService.distanceKm(lat, lon, event.getLatitude(), event.getLongitude());
        return new EventResponse(event.getId(), event.getTitle(), event.getCity(), event.getVenue(),
                event.getLatitude(), event.getLongitude(), event.getStartsAt(), distance);
    }
}
