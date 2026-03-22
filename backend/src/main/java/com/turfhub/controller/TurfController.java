package com.turfhub.controller;

import com.turfhub.dto.TurfRequest;
import com.turfhub.dto.TurfResponse;
import com.turfhub.service.TurfMapper;
import com.turfhub.service.TurfService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turfs")
public class TurfController {
    private final TurfService turfService;
    private final TurfMapper turfMapper;

    public TurfController(TurfService turfService, TurfMapper turfMapper) {
        this.turfService = turfService;
        this.turfMapper = turfMapper;
    }

    @GetMapping
    public List<TurfResponse> getTurfs(@RequestParam(required = false) String city,
                                       @RequestParam(required = false) String sport) {
        return turfService.search(city, sport).stream().map(turfMapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public TurfResponse getById(@PathVariable Long id) {
        return turfMapper.toResponse(turfService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TurfResponse create(@RequestBody @Valid TurfRequest request) {
        return turfMapper.toResponse(turfService.create(request));
    }

    @PutMapping("/{id}")
    public TurfResponse update(@PathVariable Long id, @RequestBody @Valid TurfRequest request) {
        return turfMapper.toResponse(turfService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        turfService.delete(id);
    }
}
