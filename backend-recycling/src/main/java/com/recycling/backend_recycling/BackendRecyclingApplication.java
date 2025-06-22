package com.recycling.backend_recycling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class BackendRecyclingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendRecyclingApplication.class, args);
	}

}
