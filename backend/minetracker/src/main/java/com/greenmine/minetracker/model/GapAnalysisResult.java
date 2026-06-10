package com.greenmine.minetracker.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GapAnalysisResult extends EmissionResult {
    private double carbonSink; // how much CO₂ the forest absorbs
    private double gap; // totalEmissions minus carbonSink
    private String status; // "deficit" or "surplus"
  
}
