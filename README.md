# ELEC5620AISystem

## Smart Home Management Platform

This project, *ELEC5620AISystem*, is an intelligent home management platform that includes an administrator website and a user interface. It leverages React for the frontend and Spring Boot for the backend, with Docker employed for deployment. The platform integrates advanced APIs to enhance user experience and interaction, making it suitable for both property managers and residents.

### Key Features

- **Control Panel**: A central user-friendly interface for managing smart home devices.
- **Environmental Control**: The platform automatically configures room devices based on user preferences and moods.
- **Voice-to-Text Processing**: Allows seamless voice input, which is converted to text, making control intuitive and accessible.

### Technologies Used

- **Frontend**: React is used to create dynamic, responsive user interfaces for both the administrator and user portals.
- **Backend**: Spring Boot powers the backend, handling data management and business logic.
- **Deployment**: Docker is utilized for containerization, ensuring a consistent environment and smooth deployment.
- **OpenAI Integration**: For processing user inputs and customizing device settings based on user sentiments.
- **Voice Recognition API**: Transforms voice inputs into text in real-time, enhancing accessibility and ease of use.

## Project Configuration

To configure the project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start up the Frontend**: Configure the necessary environment variables as specified in `.env.example`. Ensure the variables for API keys (OpenAI, Voice Recognition API) and backend server are correctly set.

## Deployment Instructions

1. **Build and Deploy Backend**:
   - Navigate to the backend directory and run:
     ```bash
     mvn clean install
     docker build -t elec5620-backend .
     docker run -p 8080:8080 elec5620-backend
     <!-- OR -->
     mvn spring-boot:run
     ```

2. **Build and Deploy Frontend**:
   - From the root directory, run:
     ```bash
     npm run build
     docker build -t elec5620-frontend .
     docker run -p 3000:3000 elec5620-frontend
     <!-- OR -->
     npm start
     ```

3. **Access the Application**: Open your browser and go to `http://localhost:3000`.

## Usage Instructions

1. Log in as an administrator or user.
2. Navigate through the Control Panel to manage devices, monitor home environments, and adjust settings.
3. Use voice commands for easy control, or type in commands if preferred. The system will process commands via the ControlPanel.js frontend component, with real-time responses powered by EnvironmentController.js on the backend.

## Advanced Techniques and Integrations

This platform utilizes advanced technology integrations to create an intelligent and responsive smart home system:

- **NLP (Natural Language Processing)**: Integrated via OpenAI for analyzing and responding to user sentiments and preferences, dynamically adjusting device configurations. (See '..\frontend\smart-home\src\components\user\ControlPanel.js' and '..\backend\smart-home\src\main\java\org\example\smarthome\Controller\EnvironmentController.java' for this API)
- **Voice-to-Text API**: A robust API processes voice inputs, which are converted to text in real-time, making voice control simple and user-friendly. (See 'ControlPanel.js' for this API)
- **Containerized Deployment**: Using Docker allows for seamless deployment across environments, ensuring platform stability and scalability.

## Contribution Table

| Team Member      | Task Allocation                                  | Contribution (%) |
|------------------|--------------------------------------------------|------------------|
| **Jinyuan Liu**  | Frontend Development, UI/UX Design               | 20%              |
| **Renjie Yao**   | Backend Development, API Integration             | 20%              |
| **Ce Wang**      | Machine Learning Model Implementation            | 20%              |
| **Guifu Zhang**  | Project Management, Documentation                | 20%              |
| **Ziang Chen**   | Project Management, Code Review and Optimization | 20%              |

Each team member played a crucial role in ensuring a well-rounded, functional, and polished smart home management platform.


### Final Code Submission

The final code is directly submitted as per project requirements.
