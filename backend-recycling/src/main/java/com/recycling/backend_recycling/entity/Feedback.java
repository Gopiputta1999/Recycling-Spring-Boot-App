package com.recycling.backend_recycling.entity;
import jakarta.persistence.*;
@Entity
@Table(name = "feedback")
public class Feedback {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String name;
private String description;
private int rating;

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
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public int getRating() {
	return rating;
}
public void setRating(int rating) {
	this.rating = rating;
}

}
