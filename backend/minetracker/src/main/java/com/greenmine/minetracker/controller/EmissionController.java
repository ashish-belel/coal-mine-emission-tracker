package com.greenmine.minetracker.controller;

import com.greenmine.minetracker.service.EmissionService;
import com.greenmine.minetracker.service.GapAnalysisService;
import com.greenmine.minetracker.model.EmissionRequest;
import com.greenmine.minetracker.model.EmissionResult;
import com.greenmine.minetracker.model.GapAnalysisRequest;
import com.greenmine.minetracker.model.GapAnalysisResult;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/emissions")
public class EmissionController {
  private final EmissionService emissionService;
  private final GapAnalysisService gapAnalysisService;

  public EmissionController(EmissionService emissionService, GapAnalysisService gapAnalysisService) {
    this.emissionService = emissionService;
    this.gapAnalysisService = gapAnalysisService;
  }

  @PostMapping("/gap-analysis")
  public GapAnalysisResult analyzeGap(@RequestBody GapAnalysisRequest request) {
    return gapAnalysisService.analyzeGap(request);
  }

  @PostMapping("/calculate")
  public EmissionResult calculateEmissions(@RequestBody EmissionRequest request) {
    return emissionService.calculateEmissions(request);
  }
}
