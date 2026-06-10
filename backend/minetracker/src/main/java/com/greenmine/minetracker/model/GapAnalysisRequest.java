package com.greenmine.minetracker.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GapAnalysisRequest extends EmissionRequest {
    private double forestArea; // in hectares
  
}
