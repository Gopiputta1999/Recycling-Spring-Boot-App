package com.recycling.backend_recycling.repository;

import com.recycling.backend_recycling.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {
}
