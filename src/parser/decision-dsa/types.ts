export type DecisionDsaState = RuleState[];

export type DecisionDsaTransition = {
  fromState: number;
  toState: number;
  symbol: string;
};

export type DecisionDsa = {
  states: DecisionDsaState[];
  transitions: DecisionDsaTransition[];
};

export type RuleState = {
  type: string;
  sequence: string[];
  index: number;
  lookahead: string;
};
