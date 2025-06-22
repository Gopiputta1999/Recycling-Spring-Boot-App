package com.recycling.backend_recycling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycling.backend_recycling.entity.UserContribution;
import com.recycling.backend_recycling.repository.UserContributionRepo;

@Service
public class UserContributionService {
	@Autowired
	private UserContributionRepo userRepo;
	
	public List<UserContribution> getContributionData(){
		return userRepo.findAll();
	}

}
