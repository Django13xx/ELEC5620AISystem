-- 创建数据库
CREATE DATABASE IF NOT EXISTS smarthome;

-- 使用数据库
USE smarthome;

-- 删除已有的用户表和环境表，以便重新创建
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS environment;

-- 创建用户表
CREATE TABLE user (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(50) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      password VARCHAR(100) NOT NULL,
                      role ENUM('property_manager', 'homeowner', 'resident', 'visitor') NOT NULL,
                      parent_id INT DEFAULT 0
);

-- 创建环境表
CREATE TABLE environment (
                             environment_id INT AUTO_INCREMENT PRIMARY KEY,
                             ac_temperature INT NOT NULL,
                             curtain_status INT NOT NULL,
                             music_track INT,
                             fragrance_type INT
);

-- 示例数据插入
INSERT INTO user (username, email, password, role, parent_id) VALUES
                                                                  ('manager1', 'manager1@example.com', 'password1', 'property_manager', 0),
                                                                  ('homeowner1', 'homeowner1@example.com', 'password2', 'homeowner', 1),
                                                                  ('resident1', 'resident1@example.com', 'password3', 'resident', 2);

INSERT INTO environment (ac_temperature, curtain_status, music_track, fragrance_type) VALUES
                                                                                          (23, 1, 1, 1),
                                                                                          (25, 0, 2, 2);
