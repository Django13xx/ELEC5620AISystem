package org.example.smarthome.Controller;

import org.example.smarthome.Entity.Environment;
import org.example.smarthome.Service.OpenAIService;
import org.example.smarthome.Repository.EnvironmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/environment")
public class EnvironmentController {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private EnvironmentRepository environmentRepository;

    private static final int MAX_RETRIES = 3; // 设置最大重试次数
    private static final Map<String, Object> DEFAULT_RESPONSE = new HashMap<>() {{
        put("lightStatus", 2);
        put("acTemperature", 26);
        put("fragranceType", 2);
        put("musicType", 6);
    }};

    @PostMapping("/process-text")
    public ResponseEntity<Map<String, Object>> processText(@RequestBody String userInput) {
        return processTextWithRetries(userInput, MAX_RETRIES);
    }

    // 带有重试逻辑的方法
    private ResponseEntity<Map<String, Object>> processTextWithRetries(String userInput, int retries) {
        try {
            // 调用 OpenAI 服务生成响应
            String response = openAIService.generateResponse(userInput);

            // 处理用逗号分隔的字符串响应
            String[] values = response.split(",");

            // 检查响应是否符合预期
            if (values.length != 4) {
                if (retries > 0) {
                    return processTextWithRetries(userInput, retries - 1);
                } else {
                    return new ResponseEntity<>(DEFAULT_RESPONSE, HttpStatus.OK);
                }
            }

            // 解析整数值
            int acTemperature = Integer.parseInt(values[0].trim());
            int lightStatus = Integer.parseInt(values[1].trim());
            int musicType = Integer.parseInt(values[2].trim());
            int fragranceType = Integer.parseInt(values[3].trim());

            // 创建 Environment 对象并设置属性
            Environment environment = new Environment();
            environment.setAcTemperature(acTemperature);
            environment.setLightStatus(lightStatus);
            environment.setMusicTrack(musicType);
            environment.setFragranceType(fragranceType);

            // 将环境对象存入数据库
            environmentRepository.save(environment);

            // 创建成功响应数据
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("acTemperature", acTemperature);
            successResponse.put("lightStatus", lightStatus);
            successResponse.put("musicType", musicType);
            successResponse.put("fragranceType", fragranceType);

            // 返回成功消息
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error occurred while communicating with OpenAI API: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/history")
    public ResponseEntity<Iterable<Environment>> getEnvironmentHistory() {
        Iterable<Environment> environmentHistory = environmentRepository.findAll();
        return new ResponseEntity<>(environmentHistory, HttpStatus.OK);
    }
}
