package com.recycling.backend_recycling.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycling.backend_recycling.entity.PlasticItem;
import com.recycling.backend_recycling.repository.PlasticItemRepo;

@Service
public class PlasticItemSubmissionsService {
	@Autowired
	private PlasticItemRepo plasticItemRepo;
	
	public List<PlasticItem> getAllSubmissions() {
        return plasticItemRepo.findAll();
    }
	public PlasticItem saveSubmission(PlasticItem itemsubmission) {
        return plasticItemRepo.save(itemsubmission);
    }
	public PlasticItem updateSubmissionStatus(int id, PlasticItem.Status status) {
        Optional<PlasticItem> submissionOpt = plasticItemRepo.findById(id);
        if (submissionOpt.isPresent()) {
        	PlasticItem submission = submissionOpt.get();
            submission.setStatus(status);
            if (status == PlasticItem.Status.APPROVED) {
                submission.setApprovedAt(LocalDateTime.now());
            }
            return plasticItemRepo.save(submission);
        }
        throw new RuntimeException("Submission not found");
    }

}
