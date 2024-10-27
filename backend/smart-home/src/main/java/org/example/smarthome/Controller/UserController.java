package org.example.smarthome.Controller;
import jakarta.transaction.Transactional;
import org.example.smarthome.Entity.Property;
import org.example.smarthome.Repository.PropertyRepository;
import org.example.smarthome.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.example.smarthome.Entity.User;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000") // 修改为前端的实际运行地址
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> user = userRepository.findByEmailAndPassword(email, password);

        if (user.isPresent()) {
            String role = user.get().getRole().name();
            int userId = user.get().getUserId();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("role", role);
            response.put("userId", String.valueOf(userId));
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }


    @PostMapping("/addresident")
    public ResponseEntity<User> addResident(@RequestParam int userId, @RequestParam int propertyNumber, @RequestBody User user) {
        user.setRole(User.Role.RESIDENT);
        user.setParentId(userId);
        user.setPassword("resident" + user.getNumber());
        // 保存新用户
        User savedUser = userRepository.save(user);

        // 获取 property_number 并插入一条新的 property 记录

        Property newProperty = new Property();
        newProperty.setPropertyNumber(propertyNumber);
        newProperty.setuser(savedUser);
        newProperty.setRelationship(Property.Relationship.LEASE);
        propertyRepository.save(newProperty);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/addhomeowner")
    public ResponseEntity<User> addHomeOwner(@RequestParam int userId, @RequestParam int propertyId, @RequestBody User user) {
        // Check if a user with the same email already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            // If user exists, update the property with the existing user ID
            Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
            if (propertyOptional.isPresent()) {
                Property property = propertyOptional.get();
                property.setuser(existingUser.get());  // Associate the property with the existing user
                propertyRepository.save(property);
                return new ResponseEntity<>(HttpStatus.OK); // Respond with 200 OK
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Property not found
            }
        }

        // If user does not exist, create a new one with the default role "HOMEOWNER"
        user.setRole(User.Role.HOMEOWNER);
        user.setParentId(userId);
        user.setPassword("homeowner" + user.getNumber());

        // Save the new user
        User savedUser = userRepository.save(user);

        // Associate the new user with the property
        Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
        if (propertyOptional.isPresent()) {
            Property property = propertyOptional.get();
            property.setuser(savedUser);
            propertyRepository.save(property);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED); // Respond with 201 Created
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Property not found
        }
    }


    @DeleteMapping("/deleteresident")
    @Transactional
    public ResponseEntity<String> deleteResident(@RequestParam int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getRole() == User.Role.RESIDENT) {
            // 删除与该用户相关的property数据
            propertyRepository.deleteByUser_UserId(userId);
            // 删除用户记录
            userRepository.deleteById(userId);
            return new ResponseEntity<>("Resident deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Resident not found or role mismatch", HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/deletehomeowner")
    public ResponseEntity<String> deleteHomeOwner(@RequestParam int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getRole() == User.Role.HOMEOWNER) {
            userRepository.deleteById(userId);
            return new ResponseEntity<>("Homeowner deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Homeowner not found or role mismatch", HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/children")
    public ResponseEntity<List<User>> getChildren(@RequestParam int userId) {
        List<User> children = userRepository.findByParentId(userId);

        if (!children.isEmpty()) {
            return new ResponseEntity<>(children, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


}