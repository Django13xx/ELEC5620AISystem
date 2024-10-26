package org.example.smarthome.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "environment")
public class Environment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int environmentId;

    @Column(nullable = false)
    private int acTemperature;

    @Column(nullable = false)
    private int lightStatus;

    @Column
    private Integer musicTrack;

    @Column
    private Integer fragranceType;

    public Environment() {}

    public Environment(int environmentId, int acTemperature, int lightStatus, Integer musicTrack, Integer fragranceType) {
        this.environmentId = environmentId;
        this.acTemperature = acTemperature;
        this.lightStatus = lightStatus;
        this.musicTrack = musicTrack;
        this.fragranceType = fragranceType;
    }

    // Getters and setters
    public int getEnvironmentId() {
        return environmentId;
    }

    public void setEnvironmentId(int environmentId) {
        this.environmentId = environmentId;
    }

    public int getAcTemperature() {
        return acTemperature;
    }

    public void setAcTemperature(int acTemperature) {
        this.acTemperature = acTemperature;
    }

    public int getLightStatus() {
        return lightStatus;
    }

    public void setLightStatus(int lightStatus) {
        this.lightStatus = lightStatus;
    }

    public Integer getMusicTrack() {
        return musicTrack;
    }

    public void setMusicTrack(Integer musicTrack) {
        this.musicTrack = musicTrack;
    }

    public Integer getFragranceType() {
        return fragranceType;
    }

    public void setFragranceType(Integer fragranceType) {
        this.fragranceType = fragranceType;
    }
}
