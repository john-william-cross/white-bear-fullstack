function checkIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}

const MAX_CARD_CHARS = 240;

const defaultLevel = 1;

// 43 minutes into 358A this function is not in Mike's helper.js file
export function safelyParseJson(value) {
   try {
      JSON.parse(value);
   } catch {
      // if error return the original value
      return value;
   }
   return JSON.parse(value);
}

export { checkIsOver, MAX_CARD_CHARS, defaultLevel };
