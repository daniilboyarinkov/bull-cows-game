import { ALREADY_TRIED_MESSAGE } from "../constants"
import Game from "./Game"

let game = Game.getInstance()

describe("Game testing cases", () => {
  test("Moves Mechanism", () => {
    expect(game.moves).toBe(0)
    game.guess("1234")
    expect(game.moves).toBe(1)
    game.guess("2567")
    expect(game.moves).toBe(2)
    game.guess("9876")
    expect(game.moves).toBe(3)
    game.guess("1920")
    expect(game.moves).toBe(4)
  })

  test("Attempts Mechanism", () => {
    const expected = new Set(["1234", "2567", "9876", "1920"])
    expect(game.attempts).toEqual(expected)
  })

  test("Changing type of game (with/without repetitions)", () => {
    game = Game.setWithRepetitions(true)
    expect(game.moves).toBe(0)
    expect(game.attempts).toEqual(new Set())
  })

  test("Double guess = Error", () => {
    game.guess("1234")
    expect(() => {
      game.guess("1234")
    }).toThrowError(Error(ALREADY_TRIED_MESSAGE))
  })
})
