package com.recycling.backend_recycling.entity;
import jakarta.persistence.*;
@Entity
public class ContactUs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
    private String email;
    private String modeOfContact;
    private String reason;
    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getModeOfContact() {
		return modeOfContact;
	}
	public void setModeOfContact(String modeOfContact) {
		this.modeOfContact = modeOfContact;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	

}
