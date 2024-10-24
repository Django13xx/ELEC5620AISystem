-- 创建数据库
CREATE DATABASE smarthome;

-- 使用数据库
USE smarthome;

-- 创建用户表
CREATE TABLE user (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(50) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      password VARCHAR(100) NOT NULL,
                      role ENUM('resident', 'manager', 'guest') NOT NULL
);

-- 创建环境表
CREATE TABLE environment (
                             environment_id INT AUTO_INCREMENT PRIMARY KEY,
                             ac_temperature DECIMAL(5, 2) NOT NULL,
                             curtain_status ENUM('open', 'closed') NOT NULL,
                             music_track VARCHAR(100),
                             fragrance_type VARCHAR(100)
);

-- 示例数据插入
INSERT INTO user (username, email, password, role) VALUES
                                                       ('user1', 'user1@example.com', 'password1', 'resident'),
                                                       ('user2', 'user2@example.com', 'password2', 'manager');

INSERT INTO environment (ac_temperature, curtain_status, music_track, fragrance_type) VALUES
                                                                                          (23.5, 'open', 'Beethoven Symphony No.5', 'Lavender'),
                                                                                          (25.0, 'closed', 'Chill Vibes', 'Vanilla');
