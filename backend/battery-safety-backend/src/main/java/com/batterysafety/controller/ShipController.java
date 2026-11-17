
package com.batterysafety.controller;

import com.batterysafety.entity.Ship;
import com.batterysafety.repository.ShipRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ships")
public class ShipController {

    private final ShipRepository shipRepository;

    public ShipController(ShipRepository shipRepository) {
        this.shipRepository = shipRepository;
    }

    // Get all ships
    @GetMapping
public List<Ship> getAllShips() {
    return shipRepository.findAll(
        org.springframework.data.domain.Sort.by("shipId").ascending()
    );
}

    // Register a new ship
    @PostMapping
    public Ship addShip(@RequestBody Ship ship) {
        return shipRepository.save(ship);
    }
    
@PutMapping("/{id}")
public Ship updateShip(@PathVariable Long id, @RequestBody Ship updatedShip) {

    Ship existingShip = shipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ship not found"));

    existingShip.setShipName(updatedShip.getShipName());
    existingShip.setShipType(updatedShip.getShipType());
    existingShip.setImoNumber(updatedShip.getImoNumber());

    return shipRepository.save(existingShip);
}


@DeleteMapping("/{id}")
public String deleteShip(@PathVariable Long id) {

    Ship ship = shipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ship not found"));

    shipRepository.delete(ship);

    return "Ship deleted successfully!";
}

}
