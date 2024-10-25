package org.example.smarthome.Controller;
import org.example.smarthome.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.example.smarthome.Entity.User;
@CrossOrigin(origins = "http://localhost:3000") // 修改为前端的实际运行地址
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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

}