package com.recycling.backend_recycling.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class BotController {

    @PostMapping("/chatbot")
    public ResponseEntity<Map<String, String>> getAnswer(@RequestBody Map<String, String> question) {
        String userQuestion = question.get("message").toLowerCase();
        Map<String, String> response = new HashMap<>();
       

        if (userQuestion.contains("plastic recycling")) {
            response.put("response", 
                "Plastic recycling is the process of recovering scrap or waste plastics and reprocessing them into useful products. " +
                "Different types of plastics (e.g., PET, HDPE) require different methods for recycling.");
        } else if (userQuestion.contains("types of plastics")) {
            response.put("response", 
                "Common types of plastics include PET (Polyethylene Terephthalate), HDPE (High-Density Polyethylene), " +
                "PVC (Polyvinyl Chloride), LDPE (Low-Density Polyethylene), PP (Polypropylene), and PS (Polystyrene).");
        } 
        else if(userQuestion.toLowerCase().contains("hi")||userQuestion.toLowerCase().contains("hello")) {
        	response.put("response", userQuestion+"! How can I assist you ?");
        }
        else if (userQuestion.contains("benefits of plastic-recycling")) {
            response.put("response", 
                "The benefits of recycling include reducing landfill waste, conserving natural resources, saving energy, " +
                "reducing greenhouse gas emissions, and creating jobs in the recycling and manufacturing industries.");
        } else if (userQuestion.contains("challenges in recycling")) {
            response.put("response", 
                "Challenges in recycling include contamination of materials, limited recycling infrastructure, " +
                "and the economic costs of sorting and processing waste.");
        } else {
            
            response.put("response", 
                "Sorry, I couldn't find an answer to your question. Please reach out to our team at " +
                "webdevelopment@gmail.com for more details regarding your query: " + question.get("message"));
        }

        return ResponseEntity.ok(response);
    }
}
