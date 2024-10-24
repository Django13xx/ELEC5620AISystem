package org.example.smarthome.Entity;
import jakarta.persistence.*;
@Entity
@Table(name = "environment")
public class Environment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int environmentId;

    @Column(nullable = false, precision = 5, scale = 2)
    private double acTemperature;

    @Column(nullable = false)
    private String curtainStatus;

    @Column(length = 100)
    private String musicTrack;

    @Column(length = 100)
    private String fragranceType;

    public Environment() {}

    public Environment(int environmentId, double acTemperature, String curtainStatus, String musicTrack, String fragranceType) {
        this.environmentId = environmentId;
        this.acTemperature = acTemperature;
        this.curtainStatus = curtainStatus;
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

    public double getAcTemperature() {
        return acTemperature;
    }

    public void setAcTemperature(double acTemperature) {
        this.acTemperature = acTemperature;
    }

    public String getCurtainStatus() {
        return curtainStatus;
    }

    public void setCurtainStatus(String curtainStatus) {
        this.curtainStatus = curtainStatus;
    }

    public String getMusicTrack() {
        return musicTrack;
    }

    public void setMusicTrack(String musicTrack) {
        this.musicTrack = musicTrack;
    }

    public String getFragranceType() {
        return fragranceType;
    }

    public void setFragranceType(String fragranceType) {
        this.fragranceType = fragranceType;
    }
}
