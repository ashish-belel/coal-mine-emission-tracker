package com.greenmine.minetracker.service;

import org.springframework.stereotype.Service;

import com.greenmine.minetracker.model.EmissionRequest;
import com.greenmine.minetracker.constants.EmissionFactors;
import com.greenmine.minetracker.model.EmissionResult;

@Service
public class EmissionService {
  public EmissionResult calculateEmissions(EmissionRequest request) {
    double excavationEmissions = request.getExcavationVolume() * EmissionFactors.COAL_EXCAVATION_CO2_PER_M3;

    double transportEmissions = 0;  //default 0 for electric
    if (request.getFuelType().equalsIgnoreCase("diesel")) {
      transportEmissions = request.getTransportDistance() * EmissionFactors.DIESEL_TRANSPORT_CO2_PER_KM;
    }

    double equipmentEmissions = request.getEquipmentHoursPerMonth() * EmissionFactors.EQUIPMENT_CO2_PER_HOUR;

    double totalEmissions = excavationEmissions + transportEmissions + equipmentEmissions;

    return new EmissionResult(excavationEmissions, transportEmissions, equipmentEmissions, totalEmissions);
  }
}
