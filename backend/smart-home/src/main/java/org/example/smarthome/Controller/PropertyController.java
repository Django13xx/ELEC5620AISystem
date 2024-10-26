package org.example.smarthome.Controller;

import org.example.smarthome.Entity.Property;
import org.example.smarthome.Entity.User;
import org.example.smarthome.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/getbyuserid")
    public ResponseEntity<List<Map<String, Object>>> getPropertiesByUserId(@RequestParam int userId) {
        List<Property> properties = propertyRepository.findByUser_UserId(userId);
        List<Map<String, Object>> propertyListWithLeaseStatus = new ArrayList<>();

        for (Property property : properties) {
            Map<String, Object> propertyMap = new HashMap<>();

            // 遍历数据库中同样 propertyNumber 的记录，检查是否有 LEASE 关系
            List<Property> relatedProperties = propertyRepository.findByPropertyNumber(property.getPropertyNumber());
            boolean isLeased = relatedProperties.stream()
                    .filter(p -> p != null)
                    .anyMatch(p -> p.getRelationship() == Property.Relationship.LEASE);

            propertyMap.put("property", property);
            propertyMap.put("isLeased", isLeased);
            propertyListWithLeaseStatus.add(propertyMap);
        }


        if (!propertyListWithLeaseStatus.isEmpty()) {
            return new ResponseEntity<>(propertyListWithLeaseStatus, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/getbypropertynumber")
    public ResponseEntity<List<User>> getUsersByPropertyNumberAndLease(@RequestParam int propertyNumber) {
        List<Property> properties = propertyRepository.findByPropertyNumber(propertyNumber);
        List<User> users = new ArrayList<>();

        for (Property property : properties) {
            if (property.getRelationship() == Property.Relationship.LEASE) {
                users.add(property.getuser());
            }
        }

        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
    }
}