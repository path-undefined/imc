import { Token } from "./token";
import { tokenDefinitions } from "./token-definitions";

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  
  let copiedSource = JSON.parse(JSON.stringify(source));
  let currentLine = 1;
  let currentChar = 1;

  while (copiedSource.length > 0) {
    let token: Token | null = null;

    for (const tokenDefinition of tokenDefinitions) {
      const matcher = tokenDefinition.matcher;
      let raw = "";

      if (isRegExp(matcher)) {
        const matchResult = matcher.exec(copiedSource);
          if (matchResult) {
            raw = matchResult[0];
          }
        } else {
          if (copiedSource.startsWith(matcher)) {
            raw = matcher;
          }
        }

        if (raw !== "") {
          if (!token || token.raw.length < raw.length) {
            const linesEaten = raw.split(/(?:\r\n|\r|\n)/);
            const numOflinesEaten = linesEaten.length - 1;
            token = {
              type: tokenDefinition.type,
              raw,
              start: {
                line: currentLine,
                char: currentChar,
              },
              end: {
                line: currentLine + numOflinesEaten,
                char: numOflinesEaten === 0
                  ? (currentChar + linesEaten[0].length)
                  : (1 + linesEaten[numOflinesEaten].length),
              },
            };

            currentLine = token.end.line;
            currentChar = token.end.char;
          }
        }
      }

      if (token === null) {
        throw Error(`Unknown token at ${currentLine}:${currentLine}`);
      }

      if (token.type !== "line_comment" && token.type !== "trash_character") {
        tokens.push(token);
      }

      copiedSource = copiedSource.substring(token.raw.length);
    }

  return tokens;
}

function isRegExp(m: RegExp | string): m is RegExp {
  return m instanceof RegExp;
}
