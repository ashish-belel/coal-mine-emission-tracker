package com.greenmine.minetracker.controller;

import com.greenmine.minetracker.service.EmissionService;
import com.greenmine.minetracker.model.EmissionRequest;
import com.greenmine.minetracker.model.EmissionResult;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/emissions")
public class EmissionController {
  private final EmissionService emissionService;

  public EmissionController(EmissionService emissionService) {
    this.emissionService = emissionService;
  }

  @PostMapping("/calculate")
  public EmissionResult calculateEmissions(@RequestBody EmissionRequest request) {
    return emissionService.calculateEmissions(request);
  }
}
