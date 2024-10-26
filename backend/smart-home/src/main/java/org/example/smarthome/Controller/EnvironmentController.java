package org.example.smarthome.Controller;

import org.example.smarthome.Entity.Environment;
import org.example.smarthome.Service.OpenAIService;
import org.example.smarthome.Repository.EnvironmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/environment")
public class EnvironmentController {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @PostMapping("/process-text")
    public ResponseEntity<String> processText(@RequestBody String userInput) {
        try {
            String response = openAIService.generateResponse(userInput);

            // 使用 ObjectMapper 解析 JSON 响应
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response);

            // 从响应中提取整数值
            int acTemperature = responseJson.get("airConditioningTemperature").asInt();
            int lightStatus = responseJson.get("lightControl").asInt();
            int musicType = responseJson.get("musicType").asInt();
            int fragranceType = responseJson.get("fragranceType").asInt();

            // 创建 Environment 对象并存入数据库
            Environment environment = new Environment();
            environment.setAcTemperature(acTemperature);
            environment.setLightStatus(lightStatus);
            environment.setMusicTrack(musicType);
            environment.setFragranceType(fragranceType);

            environmentRepository.save(environment);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error occurred while communicating with OpenAI API: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
