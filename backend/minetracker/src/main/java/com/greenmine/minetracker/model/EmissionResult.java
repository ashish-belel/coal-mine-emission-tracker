package com.greenmine.minetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmissionResult {
    private double excavationEmissions; //metric tons CO2
    private double transportEmissions; //metric tons CO2
    private double equipmentEmissions; //metric tons CO2
    private double totalEmissions; //metric tons CO2
}
