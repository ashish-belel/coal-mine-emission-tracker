package com.greenmine.minetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmissionRequest {
    private double excavationVolume;  //m^3
    private double coalExtracted; //metric tons
    private double transportDistance; //km
    private String fuelType;  //diesel/electric
    private double equipmentHoursPerMonth;  //hrs
}
