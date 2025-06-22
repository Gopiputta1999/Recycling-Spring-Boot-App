package com.recycling.backend_recycling.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recycling.backend_recycling.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{
	boolean existsByEmail(String email);
	Optional<User> findByEmail(String email);
	void deleteById(int id);
}
