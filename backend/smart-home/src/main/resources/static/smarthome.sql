-- 创建数据库
CREATE DATABASE IF NOT EXISTS smarthome;

-- 使用数据库
USE smarthome;

-- 删除已有的房产表、环境表和用户表，以便重新创建
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS environment;
DROP TABLE IF EXISTS user;

-- 创建用户表
CREATE TABLE user (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(50) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      password VARCHAR(100) NOT NULL,
                      role ENUM('PROPERTY_MANAGER', 'HOMEOWNER', 'RESIDENT', 'VISITOR') NOT NULL,
                      parent_id INT DEFAULT 0,
                      number VARCHAR(20) NOT NULL,
                      status INT NOT NULL
);

-- 创建环境表
CREATE TABLE environment (
                             environment_id INT AUTO_INCREMENT PRIMARY KEY,
                             ac_temperature INT NOT NULL,
                             light_status INT NOT NULL,
                             music_track INT,
                             fragrance_type INT
);

-- 创建房产表
CREATE TABLE property (
                          property_id INT AUTO_INCREMENT PRIMARY KEY,
                          property_number INT NOT NULL,
                          user_id INT,
                          relationship ENUM('OWN', 'LEASE', 'VISIT') NOT NULL,
                          FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- 示例数据插入
INSERT INTO user (username, email, password, role, parent_id, number, status) VALUES
                                                                                  ('manager1', 'manager1@example.com', 'password1', 'PROPERTY_MANAGER', 0, '1234567890', 1),
                                                                                  ('homeowner1', 'homeowner1@example.com', 'password2', 'HOMEOWNER', 1, '0987654321', 1),
                                                                                  ('resident1', 'resident1@example.com', 'password3', 'RESIDENT', 2, '1122334455', 1);

INSERT INTO environment (ac_temperature, light_status, music_track, fragrance_type) VALUES
                                                                                          (23, 1, 1, 1),
                                                                                          (25, 0, 2, 2);

-- 初始化 10 间房产数据插入
INSERT INTO property (property_number, user_id, relationship) VALUES
                                                                  (1001, 1, 'OWN'),
                                                                  (1002, 1, 'OWN'),
                                                                  (1003, 1, 'OWN'),
                                                                  (1004, 1, 'OWN'),
                                                                  (1005, 1, 'OWN'),
                                                                  (1006, 1, 'OWN'),
                                                                  (1007, 1, 'OWN'),
                                                                  (1008, 1, 'OWN'),
                                                                  (1009, 1, 'OWN'),
                                                                  (1010, 1, 'OWN');
