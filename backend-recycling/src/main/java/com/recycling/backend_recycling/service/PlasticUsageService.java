package com.recycling.backend_recycling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycling.backend_recycling.entity.PlasticUsage;
import com.recycling.backend_recycling.repository.PlasticUsageRepo;

@Service
public class PlasticUsageService {
	@Autowired
	private PlasticUsageRepo plasticUsageRepo;
	
	public List<PlasticUsage> getAllData(){
		return plasticUsageRepo.findAll();
	}

}
