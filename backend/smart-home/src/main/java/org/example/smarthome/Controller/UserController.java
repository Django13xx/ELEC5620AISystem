package org.example.smarthome.Controller;
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
    public ResponseEntity<User> addResident(@RequestParam int userId, @RequestBody User user) {
        user.setRole(User.Role.RESIDENT);
        user.setParentId(userId);
    @PostMapping("/addresident")
    public ResponseEntity<User> addResident(@RequestParam int userId, @RequestBody User user) {
        // 设置默认角色为 "RESIDENT"
        user.setRole(User.Role.RESIDENT);
        // 设置 parent_id 为请求中提供的 userId
        user.setParentId(userId);
        // 设置默认密码为 "resident" + room
        if (user.getRoom() != null) {
            user.setPassword("resident" + user.getRoom());
        }
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/addhomeowner")
    public ResponseEntity<User> addHomeOwner(@RequestParam int userId, @RequestBody User user) {
        user.setRole(User.Role.HOMEOWNER);
        user.setParentId(userId);
        if (user.getRoom() != null) {
            user.setPassword("homeowner" + user.getRoom());
        }
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteresident")
    public ResponseEntity<String> deleteResident(@RequestParam int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getRole() == User.Role.RESIDENT) {
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