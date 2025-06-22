package com.recycling.backend_recycling.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PlasticUsage {
	@Id
	private Long id;
	private String city;
	private int usagePercentage;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getUsagePercentage() {
		return usagePercentage;
	}
	public void setUsagePercentage(int usagePercentage) {
		this.usagePercentage = usagePercentage;
	}
	

}
