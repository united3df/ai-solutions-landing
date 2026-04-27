export interface CompanyInfo {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: {
    label: string;
    value: number;
    description?: string;
  }[];
}

export interface AssessmentAnswer {
  questionId: string;
  value: number;
}

export interface DimensionScores {
  process: number;
  tech: number;
  org: number;
  roi: number;
  size?: number;
}

export interface AssessmentResults {
  companyInfo: CompanyInfo;
  answers: AssessmentAnswer[];
  overallScore: number;
  dimensionScores: DimensionScores;
  tier: "high" | "good" | "early" | "explore";
  tierLabel: string;
  advice: string;
}

export interface ExtendedReportData {
  readinessScore: {
    score: number;
    breakdown: {
      technical: number;
      organizational: number;
      processMaturity: number;
    };
  };
  riskIndex: {
    score: number;
    factors: {
      name: string;
      severity: "low" | "medium" | "high";
      description: string;
    }[];
  };
  automationOpportunities: {
    department: string;
    process: string;
    currentEffort: string;
    automationPotential: number;
    estimatedROI: string;
    implementation: "quick-win" | "medium-term" | "long-term";
  }[];
  costBenefit: {
    currentAnnualCost: number;
    projectedSavings: number;
    implementationCost: number;
    paybackPeriod: string;
    fiveYearROI: number;
  };
  techStack: {
    category: string;
    tool: string;
    description: string;
    priority: "essential" | "recommended" | "nice-to-have";
  }[];
  actionPlan: {
    phase: string;
    timeframe: string;
    actions: string[];
    expectedOutcome: string;
  }[];
  benchmark: {
    metric: string;
    yourScore: number;
    industryAverage: number;
    topPerformers: number;
  }[];
  disruptionRisk: {
    overallRisk: "low" | "medium" | "high";
    affectedRoles: {
      role: string;
      riskLevel: number;
      recommendation: string;
    }[];
    timelineEstimate: string;
  };
  roadmap: {
    quarter: string;
    initiatives: {
      name: string;
      priority: number;
      resources: string;
      dependencies: string[];
    }[];
  }[];
  executiveSummary: {
    headline: string;
    keyFindings: string[];
    strategicRecommendations: string[];
    nextSteps: string[];
  };
}
