package com.recycling.backend_recycling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycling.backend_recycling.entity.Feedback;
import com.recycling.backend_recycling.repository.FeedbackRepo;

@Service
public class FeedbackService {
	@Autowired
	private FeedbackRepo feedbackrepo;
	public List<Feedback> getFeedbackData(){
		return feedbackrepo.findAll();
	}

}
