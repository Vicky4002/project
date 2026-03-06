package com.turfhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "turfs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Turf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String sport;

    private String address;
    private Double latitude;
    private Double longitude;
    private Double hourlyRate;
    private boolean available;
}
