package com.recycling.backend_recycling.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
	@Bean
	public InMemoryUserDetailsManager userDetailsService() {
		UserDetails user=User.withDefaultPasswordEncoder()
				             .username("gopi")
				             .password("gopi")
				             .roles("USER")
				             .build();
		return new InMemoryUserDetailsManager(user);
	}
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http.csrf().disable()
	    .cors().and()
	        .authorizeHttpRequests((a) -> a
	            .requestMatchers("/signin","/search","/submit","/nearby").permitAll()
	            .anyRequest().authenticated()          
	        )
	        .httpBasic(); 
	    return http.build();
	}
	

}
