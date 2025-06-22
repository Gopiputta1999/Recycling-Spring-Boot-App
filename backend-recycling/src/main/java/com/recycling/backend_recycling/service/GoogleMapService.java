package com.recycling.backend_recycling.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleMapService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

  
    public String getRecyclingCenterDetails(double latitude, double longitude) {
        try {
            URIBuilder uriBuilder = new URIBuilder("https://maps.googleapis.com/maps/api/geocode/json");
            uriBuilder.addParameter("lattitude", latitude + "," + longitude);
            uriBuilder.addParameter("key", apiKey);

            return restTemplate.getForObject(uriBuilder.build(), String.class);
        } catch (Exception e) {
            throw new RuntimeException("Error while getting data " + e.getMessage());
        }
    }


    public String getNearbyRecyclingCenters(double latitude, double longitude) {
        try {
            URIBuilder uriBuilder = new URIBuilder("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
            uriBuilder.addParameter("location", latitude + "," + longitude);
            uriBuilder.addParameter("radius", "5000");
            uriBuilder.addParameter("type", "recycle center");
            uriBuilder.addParameter("key", apiKey);

            return restTemplate.getForObject(uriBuilder.build(), String.class);
        } catch (Exception e) {
            throw new RuntimeException("error while getting nearby centers: " + e.getMessage());
        }
    }
}

