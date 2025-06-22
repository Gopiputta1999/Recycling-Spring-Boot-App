package com.recycling.backend_recycling.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.recycling.backend_recycling.entity.ContactUs;
import com.recycling.backend_recycling.entity.Feedback;
import com.recycling.backend_recycling.entity.PlasticItem;
import com.recycling.backend_recycling.entity.PlasticUsage;
import com.recycling.backend_recycling.entity.User;
import com.recycling.backend_recycling.entity.UserContribution;
import com.recycling.backend_recycling.repository.ContactUsRepo;
import com.recycling.backend_recycling.repository.FeedbackRepo;
import com.recycling.backend_recycling.repository.PlasticItemRepo;
import com.recycling.backend_recycling.repository.UserRepo;
import com.recycling.backend_recycling.service.FeedbackService;
import com.recycling.backend_recycling.service.PlasticItemSubmissionsService;
import com.recycling.backend_recycling.service.PlasticUsageService;
import com.recycling.backend_recycling.service.UserContributionService;
import com.recycling.backend_recycling.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
    private FeedbackRepo feedbackRepo;
	@Autowired
    private ContactUsRepo contactUsRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PlasticUsageService plasticUsageService;
	@Autowired
	private UserContributionService userContributionService;
	@Autowired
	private PlasticItemSubmissionsService submissionservice;
	@Autowired
	private FeedbackService feedbackService;
	@Autowired
	private PlasticItemRepo plasticItemRepo;
	
	private static final String UPLOAD_DIR = "uploads/";
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@PostMapping("/signin")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
        	user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userService.getUserData();
	}
	@PutMapping("/updateuser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User updated) {
        try {
            User user = userService.updateUser(id, updated);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
	@PostMapping("/feedback")
    public ResponseEntity<Feedback> saveFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackRepo.save(feedback);
        return ResponseEntity.ok(savedFeedback);
    }
	
	@PostMapping("/contactus")
	public ResponseEntity<ContactUs> saveContactForm(@RequestBody ContactUs contactUs) {
        ContactUs saveData = contactUsRepo.save(contactUs);
        return ResponseEntity.ok(saveData);
    }
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(HttpServletRequest request, @RequestBody Map<String, String> loginData) {
	    String email = loginData.get("email");
	    String password = loginData.get("password");

	    try {
	        
	        Map<String, Object> response = userService.loginUser(email, password);

	        
	        if (passwordEncoder.matches(password, (String) response.get("hashedPassword"))) {
	           
	            HttpSession session = request.getSession();
	            session.setAttribute("email", response.get("email"));
	            session.setMaxInactiveInterval(30 * 60);

	            return ResponseEntity.ok("Login successful");
	        }
	    } catch (RuntimeException e) {
	       
	    }

	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
	}

	@GetMapping("/session")
    public ResponseEntity<?> getSessionDetails(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            return ResponseEntity.ok("Logged in as: " + session.getAttribute("email"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
    }
	@PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }
	@DeleteMapping("/remove/{id}")
	public String deleteUser(@PathVariable int id) {
		return userService.deleteUser(id);
	}
	@GetMapping("/getUsageData")
	public List<PlasticUsage> getData(){
		return plasticUsageService.getAllData();
	}
	@GetMapping("/getContributionData")
	public List<UserContribution> getUserContribution(){
		return userContributionService.getContributionData();
	}
	@GetMapping("/getFeedbackData")
	public List<Feedback> getFeedback(){
		return feedbackService.getFeedbackData();
	}
	 @GetMapping("/getSubmissions")
	 public List<PlasticItem> getAllSubmissions() {
	        return submissionservice.getAllSubmissions();
	    }
	 @PostMapping("/submit")
	    public ResponseEntity<String> submitPlasticItem(
	            @RequestParam("userId") int userId,
	            @RequestParam("itemType") String itemType,
	            @RequestParam("description") String description,
	            @RequestParam("image") MultipartFile image
	    ) {
	        try {
	            // Save image to local directory
	            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
	            Path filePath = Paths.get(UPLOAD_DIR + fileName);
	            Files.createDirectories(filePath.getParent());
	            Files.write(filePath, image.getBytes());

	            // Find user
	            User user = userRepo.findById(userId)
	                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

	            // Create PlasticItem
	            PlasticItem plasticItem = new PlasticItem();
	            plasticItem.setUser(user);
	            plasticItem.setItemType(itemType);
	            plasticItem.setDescription(description);
	            plasticItem.setImageUrl(filePath.toString());
	            plasticItem.setStatus(PlasticItem.Status.PENDING);
	            plasticItem.setApprovedAt(null);

	            // Save to database
	            plasticItemRepo.save(plasticItem);

	            return ResponseEntity.ok("Item submitted successfully!");
	        } catch (IOException e) {
	            return ResponseEntity.status(500).body("Error saving image: " + e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("Error submitting item: " + e.getMessage());
	        }
	    }
	    @GetMapping("/submissions")
	    public List<PlasticItem> getPendingSubmissions() {
	        return plasticItemRepo.findByStatus(PlasticItem.Status.PENDING);
	    }
	 @PutMapping("/{id}/approve")
	    public ResponseEntity<String> approveSubmission(@PathVariable int id) {
	        Optional<PlasticItem> optionalItem = plasticItemRepo.findById(id);
	        if (optionalItem.isPresent()) {
	            PlasticItem item = optionalItem.get();
	            item.setStatus(PlasticItem.Status.APPROVED);
	            plasticItemRepo.save(item);
	            return ResponseEntity.ok("Submission approved.");
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Submission not found.");
	    }
	 @PutMapping("/{id}/reject")
	    public ResponseEntity<String> rejectSubmission(@PathVariable int id) {
	        Optional<PlasticItem> optionalItem = plasticItemRepo.findById(id);
	        if (optionalItem.isPresent()) {
	            PlasticItem item = optionalItem.get();
	            item.setStatus(PlasticItem.Status.REJECTED);
	            plasticItemRepo.save(item);
	            return ResponseEntity.ok("Submission rejected.");
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Submission not found.");
	    }
	 @PutMapping("/{id}")
	    public PlasticItem updateSubmissionStatus(@PathVariable int id, @RequestParam PlasticItem.Status status) {
	        return submissionservice.updateSubmissionStatus(id, status);
	    }
	 
	 @GetMapping("/search")
	 public List<PlasticItem> searchPlasticItems(
	            @RequestParam(required = false, defaultValue = "") String description,
	            @RequestParam(required = false, defaultValue = "") String itemType,
	            @RequestParam(required = false) PlasticItem.Status status) {
	        return plasticItemRepo.findByDescriptionContainingAndItemTypeContainingAndStatus(
	            description, itemType, status
	        );
	    }


}
