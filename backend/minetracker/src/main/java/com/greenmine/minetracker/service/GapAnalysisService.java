package com.greenmine.minetracker.service;

import org.springframework.stereotype.Service;

import com.greenmine.minetracker.constants.EmissionFactors;
import com.greenmine.minetracker.model.EmissionResult;
import com.greenmine.minetracker.model.GapAnalysisRequest;
import com.greenmine.minetracker.model.GapAnalysisResult;

@Service
public class GapAnalysisService {
  private final EmissionService emissionService;

  public GapAnalysisService(EmissionService emissionService) {
    this.emissionService = emissionService;
  }

  public GapAnalysisResult analyzeGap(GapAnalysisRequest request) {
    //call emission service
    EmissionResult emissions = emissionService.calculateEmissions(request);
    //calculate carbon sink
    double carbonSink = request.getForestArea() * EmissionFactors.FOREST_SEQUESTRATION_RATE_PER_HA;
    //calculate gap
    double gap = emissions.getTotalEmissions() - carbonSink;
    //determine status
    String status = gap > 0 ? "deficit" : "surplus";
    //build result
    GapAnalysisResult result = new GapAnalysisResult();
    result.setExcavationEmissions(emissions.getExcavationEmissions());
    result.setTransportEmissions(emissions.getTransportEmissions());
    result.setEquipmentEmissions(emissions.getEquipmentEmissions());
    result.setTotalEmissions(emissions.getTotalEmissions());
    result.setCarbonSink(carbonSink);
    result.setGap(gap);
    result.setStatus(status);
    return result;
  }
}
