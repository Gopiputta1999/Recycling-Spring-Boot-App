package com.recycling.backend_recycling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recycling.backend_recycling.entity.UserContribution;

@Repository
public interface UserContributionRepo extends JpaRepository<UserContribution,Integer> {

}
