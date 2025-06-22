package com.recycling.backend_recycling.controller;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/payment")
    public ResponseEntity<Map<String, String>> payments(@RequestBody Map<String, Object> req) {
        Stripe.apiKey = stripeApiKey;

        try {
            int amount = Integer.parseInt(req.get("amount").toString());
            Map<String, Object> my = new HashMap<>();
            my.put("amount", amount * 100); 
            my.put("currency", "gbp");
            my.put("payment_method_types", new String[]{"card"});

            PaymentIntent pay = PaymentIntent.create(my);
            Map<String, String> res = new HashMap<>();
            res.put("clientSecret", pay.getClientSecret());
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("Error!", "Payment failed  " + e.getMessage()));
        }
    }
}
