package com.turfhub.controller;

import com.turfhub.dto.TurfRequest;
import com.turfhub.model.Turf;
import com.turfhub.service.TurfService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turfs")
public class TurfController {
    private final TurfService turfService;

    public TurfController(TurfService turfService) {
        this.turfService = turfService;
    }

    @GetMapping
    public List<Turf> getTurfs(@RequestParam(required = false) String city,
                               @RequestParam(required = false) String sport) {
        return turfService.search(city, sport);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Turf create(@RequestBody @Valid TurfRequest request) {
        return turfService.create(request);
    }

    @PutMapping("/{id}")
    public Turf update(@PathVariable Long id, @RequestBody @Valid TurfRequest request) {
        return turfService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        turfService.delete(id);
    }
}
