/**
 * Represents the deploymeny category of a project.
 */
export enum Category {
  Cloud = 'cloud',
  OnPremise = 'on-premise',
  Hybrid = 'hybrid',
  Serverless = 'serverless',
  Device = 'device',
}

/**
 * Represents the complexity of a project.
 */
export enum Complexity {
  Simple = 'simple',
  Moderate = 'moderate',
  Complex = 'complex',
}

/**
 * Represents the kind of a project.
 */
export enum Kind {
  Web = 'web',
  App = 'app',
  Ml = 'ml',
  Iot = 'iot',
}
