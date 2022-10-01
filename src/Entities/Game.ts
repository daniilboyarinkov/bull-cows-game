import {
  GenerateNumberWithNoRepetitions,
  GenerateNumberWithRepetitions,
} from "../utils/NumberGeneration"
import { ALREADY_TRIED_MESSAGE } from "../constants"

export default class Game {
  private static instance: Game
  private secret: string
  private withRep: boolean
  public moves: number
  public attempts: Set<string>

  private constructor(withRep = false) {
    this.secret = withRep
      ? String(GenerateNumberWithRepetitions())
      : String(GenerateNumberWithNoRepetitions())
    this.withRep = withRep
    this.attempts = new Set()
    this.moves = 0
  }

  public static getInstance() {
    if (!this.instance) this.instance = new Game()
    return this.instance
  }

  public static setWithRepetitions(bool: boolean) {
    this.instance = new Game(bool)
    return this.instance
  }

  public guess(guess: string) {
    this.moves++
    if (this.attempts.has(guess)) throw new Error(ALREADY_TRIED_MESSAGE)
    if (this.attempts) this.attempts.add(guess)

    let bulls = 0
    let cows = 0

    const digits = new Array(10).fill(0)

    for (let i = 0; i < 4; i++) {
      const s = this.secret.charCodeAt(i) - 48
      const g = guess.charCodeAt(i) - 48

      if (s === g) bulls++
      else {
        if (digits[s] < 0) cows++
        if (digits[g] > 0) cows++

        digits[s]++
        digits[g]--
      }
    }

    return { bulls, cows }
  }
}
