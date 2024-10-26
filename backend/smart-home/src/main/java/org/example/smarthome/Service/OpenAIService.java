package org.example.smarthome.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private final RestTemplate restTemplate;

    public OpenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateResponse(String prompt) {
        // Reformatting user input prompt to better train the API for a smart home assistant
        prompt = "You are a smart home assistant. Based on the user's input, perform the following actions: " + "1. Adjust the air conditioning temperature (Celsius). " + "2. Control the curtains (0 for closed, 1 for open). " + "3. Select music type (1-5 for lyrical songs, 6-10 for light music, 11-15 for dance music, 16-20 for DJ). " + "4. Turn on a fragrance (1-4 for different types of fragrances). " + "Return four integers representing: air conditioning temperature, curtain status, music type, fragrance type. " + prompt;
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openaiApiKey);
        headers.set("Content-Type", "application/json");

        // 请求体
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo"); // 使用聊天模型
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));
        requestBody.put("max_tokens", 4096); // 限制最大 tokens 数量

        // 请求实体
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            if (response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                List<?> choices = (List<?>) responseBody.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> choice = (Map<String, Object>) choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while communicating with OpenAI API: " + e.getMessage();
        }

        return "No response from OpenAI API.";
    }
}
