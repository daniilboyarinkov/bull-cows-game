/**
 * Generates secret with probable repetitions for the game
 * @returns Random 4-digit Number from 1000 upto 9999
 */
export function GenerateNumberWithRepetitions() {
  // max: 9999 min: 1000
  return Math.floor(Math.random() * (9999 - 1000) + 1000)
}

/**
 * Generates secret with NO repetitions for the game
 * @returns Random 4-digit Number from 1000 upto 9999
 */
export function GenerateNumberWithNoRepetitions() {
  //No 0 zero for the first letter
  const digits = "123456789".split("")
  const first = shuffle(digits).pop()
  // Add "0" to the array
  digits.push("0")
  return parseInt(first + shuffle(digits).join("").substring(0, 3), 10)
}

function shuffle(o: string[]) {
  for (
    let j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o
}
