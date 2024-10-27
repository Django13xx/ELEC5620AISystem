package org.example.smarthome.Repository;

import org.example.smarthome.Entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {
    List<Property> findByUser_UserId(int userId);

    List<Property> findByPropertyNumber(int propertyNumber);

    List<Property> findByRelationship(Property.Relationship relationship);

    void deleteByUser_UserId(int userId);
}
