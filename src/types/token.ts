export type Token = {
  type: string;
  raw: string;
  start: {
    line: number;
    char: number;
  };
  end: {
    line: number;
    char: number;
  };
};
