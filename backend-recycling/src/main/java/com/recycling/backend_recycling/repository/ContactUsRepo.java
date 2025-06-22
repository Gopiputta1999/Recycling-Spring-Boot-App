package com.recycling.backend_recycling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recycling.backend_recycling.entity.ContactUs;

@Repository
public interface ContactUsRepo extends JpaRepository<ContactUs, Integer> {

}
