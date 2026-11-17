
package com.batterysafety.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ships")
public class Ship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ship_id")
    private Long shipId;

    @Column(name = "ship_name")
    private String shipName;

    @Column(name = "ship_type")
    private String shipType;

    @Column(name = "imo_number")
    private String imoNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
protected void onCreate() {
    if (createdAt == null) {
        createdAt = LocalDateTime.now();
    }
}
    public Ship() {
    }

    public Long getShipId() {
        return shipId;
    }

    public String getShipName() {
        return shipName;
    }

    public String getShipType() {
        return shipType;
    }

    public String getImoNumber() {
        return imoNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setShipName(String shipName) {
    this.shipName = shipName;
}

public void setShipType(String shipType) {
    this.shipType = shipType;
}

public void setImoNumber(String imoNumber) {
    this.imoNumber = imoNumber;
}
}
