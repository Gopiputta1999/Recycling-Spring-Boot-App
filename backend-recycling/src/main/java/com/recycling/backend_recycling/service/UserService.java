package com.recycling.backend_recycling.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.recycling.backend_recycling.entity.User;
import com.recycling.backend_recycling.repository.UserRepo;

@Service
public class UserService {
	@Autowired
	private UserRepo userRepo;
	
	public User saveUser(User user) throws Exception{
		if(userRepo.existsByEmail(user.getEmail()))
		{
			throw new Exception("Email is already in use.");
		}
		return userRepo.save(user);
	}
	public List<User> getUserData(){
		return userRepo.findAll();
	}
	
	public User updateUser(int id, User updatedUser) throws Exception {
		Optional<User> currentuseropt=userRepo.findById(id);
		if(currentuseropt==null) {
			throw new Exception("User not found !!!");
		}
		User currentuser=currentuseropt.get();
		
		currentuser.setName(updatedUser.getName());
		currentuser.setEmail(updatedUser.getEmail());
		currentuser.setRole(updatedUser.getRole());
		return userRepo.save(currentuser);
		
	}
	
	public String deleteUser(int id) {
		if(userRepo.existsById(id)) {
			userRepo.deleteById(id);
			return "user deleted successfully";
		}
		else {
			return "user not found";
		}
	}
	public Map<String, Object> loginUser(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }

}
