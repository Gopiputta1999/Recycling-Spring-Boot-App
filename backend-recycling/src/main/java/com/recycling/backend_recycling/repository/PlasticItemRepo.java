package com.recycling.backend_recycling.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recycling.backend_recycling.entity.PlasticItem;

@Repository
public interface PlasticItemRepo extends JpaRepository<PlasticItem,Integer>{
	List<PlasticItem> findByStatus(PlasticItem.Status status);
	List<PlasticItem> findByDescriptionContainingAndItemTypeContainingAndStatus(
	        String description,
	        String itemType,
	        PlasticItem.Status status
	    );
}
