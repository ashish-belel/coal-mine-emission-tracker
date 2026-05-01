package com.greenmine.minetracker.constants;
// Emission factors for coal mining activities
//Sourced from IPCC 2006 Guidelines and other relevant sources for mining emissions
//Values may change based on specific equipment, fuel types, and mining conditions, so these are general estimates for calculation purposes.

public class EmissionFactors {
  private EmissionFactors() {
    // Private constructor to prevent instantiation
  }
  public static final double COAL_EXCAVATION_CO2_PER_M3 = 0.0116; // metric tons CO2 per m^3
  public static final double DIESEL_TRANSPORT_CO2_PER_KM = 0.00027; // metric tons CO2 per km
  public static final double EQUIPMENT_CO2_PER_HOUR = 0.0254; // metric tons CO2 per hour
}
