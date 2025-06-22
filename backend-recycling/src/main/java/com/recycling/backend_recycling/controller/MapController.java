package com.recycling.backend_recycling.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recycling.backend_recycling.service.GoogleMapService;

@RestController
public class MapController {

	@Autowired
	private GoogleMapService googleMapService;
	
	@GetMapping("/location")
    public ResponseEntity<?> getRecycleDetails(
            @RequestParam double latitude,
            @RequestParam double longitude) {
        String output = googleMapService.getRecyclingCenterDetails(latitude, longitude);
        return ResponseEntity.ok(output);
    }
	
	 @GetMapping("/nearby")
	    public ResponseEntity<?> getNearbyRecyclingCenters(
	            @RequestParam double latitude,
	            @RequestParam double longitude) {
	        String output = googleMapService.getNearbyRecyclingCenters(latitude, longitude);
	        return ResponseEntity.ok(output);
	    }
}
