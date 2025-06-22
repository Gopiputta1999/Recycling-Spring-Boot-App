package com.recycling.backend_recycling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycling.backend_recycling.entity.PlasticItem;
import com.recycling.backend_recycling.repository.PlasticItemRepo;

@Service
public class PlasticItemService {
	@Autowired
	private PlasticItemRepo plasticItemRepo;
	
	

}
