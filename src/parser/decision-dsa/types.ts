export type DecisionDsaState = RuleState[];

export type DecisionDsaTransition = {
  from: number;
  to: number;
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
