package com.turfhub.controller;

import com.turfhub.dto.EventResponse;
import com.turfhub.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/nearby")
    public List<EventResponse> nearby(@RequestParam double lat,
                                      @RequestParam double lon,
                                      @RequestParam(defaultValue = "10") double radiusKm) {
        return eventService.nearbyEvents(lat, lon, radiusKm);
    }
}
