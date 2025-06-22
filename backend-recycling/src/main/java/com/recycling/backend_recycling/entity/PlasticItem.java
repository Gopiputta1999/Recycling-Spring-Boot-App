package com.recycling.backend_recycling.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class PlasticItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getItemType() {
		return itemType;
	}
	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
	private User user;
	@Column(name = "item_type")
	private String itemType;
	@Lob
    private String description;
	private String imageUrl;
	@Enumerated(EnumType.STRING)
	private Status status = Status.PENDING;
	private LocalDateTime approvedAt;
	public LocalDateTime getApprovedAt() {
		return approvedAt;
	}
	public void setApprovedAt(LocalDateTime approvedAt) {
		this.approvedAt = approvedAt;
	}
	public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }


}
