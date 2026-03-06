package com.turfhub.repository;

import com.turfhub.model.Turf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurfRepository extends JpaRepository<Turf, Long> {
    List<Turf> findByCityIgnoreCase(String city);
    List<Turf> findBySportIgnoreCase(String sport);
    List<Turf> findByCityIgnoreCaseAndSportIgnoreCase(String city, String sport);
}
