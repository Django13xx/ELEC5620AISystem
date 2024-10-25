package org.example.smarthome.Controller;

import org.example.smarthome.Entity.Property;
import org.example.smarthome.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/getbyuserid")
    public ResponseEntity<List<Property>> getPropertiesByUserId(@RequestParam int userId) {
        List<Property> properties = propertyRepository.findByUser_UserId(userId);
        if (!properties.isEmpty()) {
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}