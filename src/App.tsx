import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Game from "./Entities/Game";

import "./styles.css";

let game = Game.getInstance();

interface GuessResult {
  bulls: number;
  cows: number;
}

// interface Attempt {
//   guessResult: GuessResult;
//   attempt: string;
// }

export default function App() {
  const [guess, setGuess] = useState<string>("");
  const [modeRep, setModeRep] = useState(false);
  const [moves, setMoves] = useState(0);
  const [attempts, setAttempts] = useState(new Set<string>());
  const [results, setResults] = useState(Array<GuessResult>());
  const [showRules, setShowRules] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { width, height } = useWindowSize();

  const handleGuessInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGuess((prev) => (value.length > 4 ? prev : value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!modeRep && guess.split("").length !== new Set(guess.split("")).size)
        throw new Error(
          "Включен режим чисел без повторений.\nВ этом режиме числа с повторяющимися цифрами всегда неверны...\nБудьте внимательнее.\nМы не будем считать эту попытку за ход"
        );
      if (!guess || guess.length !== 4)
        throw new Error(
          "Невозможное число\nЧисло должно быть четырёхзначным\nБудьте внимательнее.\nМы не будем считать эту попытку за ход"
        );
      const result: GuessResult = game.guess(guess);
      setAttempts(game.attempts);
      setResults((prev) => [...prev, result]);
      if (result.bulls === 4 && result.cows === 0) setGameOver(true);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setMoves(game.moves);
      setGuess("");
    }
  };

  const handleChangeMod = () => {
    game = Game.setWithRepetitions(!modeRep);
    setModeRep((prev) => !prev);
    setMoves(game.moves);
    setAttempts(game.attempts);
    setResults(new Array<GuessResult>());
  };

  return (
    <div className="App">
      {gameOver && (
        <div
          className="popup-wrapper"
          onClick={() => {
            setShowRules(false);
          }}
        >
          <div
            className="popup win"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="win__title">Вы победили!</div>
            <p>{`Для того чтобы угадать число ${
              guess ?? ""
            } вам понадобилось всего ${moves} ходов!`}</p>
            <br />
            <b>Поздравляем!</b>
            <div>
              <button
                type="button"
                className="win__restart"
                onClick={() => {
                  setGameOver(false);
                  game = Game.setWithRepetitions(false);
                  setAttempts(new Set<string>());
                  setMoves(0);
                }}
              >
                Играть ещё!
              </button>
            </div>
          </div>
        </div>
      )}
      {gameOver && <Confetti width={width} height={height} />}
      <div
        className="corner rules"
        onClick={() => {
          setShowRules(true);
        }}
      >
        Что это?
      </div>

      <div
        className="corner change-mode"
        tabIndex={0}
        style={{ position: "absolute" }}
        onClick={handleChangeMod}
      >
        <div>{modeRep ? "С повторениями" : "Без повторений"}</div>
      </div>

      <div className="sky header">
        <div className="moves">Ходы: {moves}</div>
        <div id="cloud">
          <svg width="0" height="0">
            <filter id="filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".01"
                numOctaves="10"
              />
              <feDisplacementMap in="SourceGraphic" scale="100" />
            </filter>
          </svg>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5bc7f2"
          fillOpacity="1"
          d="M0,192L40,170.7C80,149,160,107,240,96C320,85,400,107,480,128C560,149,640,171,720,186.7C800,203,880,213,960,213.3C1040,213,1120,203,1200,181.3C1280,160,1360,128,1400,112L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>

      <div className="farm main">
        <h1 className="farm__title">Быки и коровы</h1>
        <h2 className="farm__guess-text">Я загадал число. Угадай!</h2>

        <form onSubmit={handleFormSubmit} className="guess-form">
          <input
            type="number"
            name="guess"
            id="guess"
            min="1000"
            max="9999"
            placeholder="1234"
            value={guess}
            onChange={handleGuessInput}
            className="guess-input guess-form__input"
          />
          <button
            className={`guess-input guess-form__submit guess-form__submit_${
              guess.length === 4 ? "right" : "wrong"
            }`}
            type="submit"
          >
            Попробовать {guess}
          </button>
        </form>

        <div className="paddock">
          <ul className="paddock__fence">
            {Array.from(attempts)
              .reverse()
              .map((attempt, i) => (
                <li key={attempt} className="paddock__fence-cell">
                  {`${attempts.size - i}. `}
                  <span className="attempt-text">{attempt}</span>
                  {
                    <div style={{ display: "flex", gap: "10px" }}>
                      <span>
                        <div>
                          <img
                            draggable={false}
                            src="/svg/bull.svg"
                            alt="bull"
                            width="50"
                            height="50"
                          />
                          <div className="attempt-text">
                            {results[attempts.size - i - 1].bulls}
                          </div>
                        </div>
                      </span>
                      <span>
                        <div>
                          <img
                            draggable={false}
                            src="/svg/cow.svg"
                            alt="cow"
                            width="50"
                            height="50"
                          />
                          <div className="attempt-text">
                            {results[attempts.size - i - 1].cows}
                          </div>
                        </div>
                      </span>
                    </div>
                  }
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="footer ground">
        <svg
          className="ground__top"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#5e4a17"
            fillOpacity="1"
            d="M0,224L34.3,208C68.6,192,137,160,206,144C274.3,128,343,128,411,133.3C480,139,549,149,617,144C685.7,139,754,117,823,144C891.4,171,960,245,1029,261.3C1097.1,277,1166,235,1234,229.3C1302.9,224,1371,256,1406,272L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>

        <img
          loading="lazy"
          draggable="false"
          width="100"
          className="ground__sunflower"
          src="/imgs/sunflower.png"
          alt=""
        />

        <img
          loading="lazy"
          draggable="false"
          width="125"
          className="ground__grass"
          src="https://pngimg.com/uploads/grass/grass_PNG4928.png"
          alt=""
        />
      </div>

      {showRules && (
        <div
          className="popup-wrapper"
          onClick={() => {
            setShowRules(false);
          }}
        >
          <div
            className="popup"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="popup__close"
              onClick={() => {
                setShowRules(false);
              }}
            >
              ×
            </div>
            <h1>Что это?</h1>
            <p>
              <b>Быки и коровы — </b> это логическая игра, в которой нужно
              угадать задуманное компьютером или игроком число за как можно
              меньшее количество попыток.
            </p>
            <h1>Причём тут животные?</h1>
            <p>
              <b>Это подсказки.</b>
              <br />
              <p>
                <b>Количество быков</b>
                {" — количество цифр, которые "}
                <b>есть в задуманном числе И стоят на верных позициях.</b>
              </p>
              <br />
              <p>
                <b>Количество коров</b>
                {" — количество цифр, которые "}
                <b>есть в задуманном числе.</b>
                {" Но при этом они стоят на неверных позициях."}
              </p>
            </p>
            <h1>Что за режимы?</h1>
            <p>
              У игры есть разные вариации. В этом случае с повторением цифр в
              числе и без.
            </p>
            <p>
              <b>{"Режим с повторениями "}</b>
              означает, что в загаданном числе цифры{" "}
              <b>{" могут повторяться"}</b>.
            </p>
            <p>
              <b>{"Режим без повторений "}</b>
              означает, что в загаданном числе цифры{" "}
              <b>{"НЕ могут повторяться"}</b>.
            </p>
            <h1>За сколько ходов можно угадать число?</h1>
            <p>А это самое интересное!</p>
            <p>
              В режиме <b>без повторений</b> количество возможных варинтов
              высчитывается по формуле:
            </p>
            <img
              src="https://wikimedia.org/api/rest_v1/media/math/render/svg/99e9effb201d5c0945b3a152db5a0d53fecce892"
              alt=""
            />
            <p>где N - Система счисления, а k - кол-во цифр в числе</p>
            <p>
              Поэтому кол-во возможных вариантов равно <b>4536</b> (так как 0 не
              может стоять на первом месте).
            </p>
            <br />
            <p>
              В режиме <b>с повторениями</b> количства возможных вариантов ещё
              боьльше. Высчитаваются они по формуле:{" "}
            </p>
            <img
              src="https://wikimedia.org/api/rest_v1/media/math/render/svg/feb62e42bc3d3ca9665480e0f171084426734c05"
              alt=""
            />
            <p>
              Поэтому кол-во возможных вариантов равно <b>9000</b> (так как 0 не
              может стоять на первом месте).
            </p>
            <h3>Так много вариантов! А можно как-то быстрее угадывать?</h3>
            <p>Можно!</p>
            <p>
              Дональд Кнут доказал, что чтобы выигратьв эту игру достаточно
              всего 5 ходов!
            </p>
            <a href="https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D0%BA%D0%B8_%D0%B8_%D0%BA%D0%BE%D1%80%D0%BE%D0%B2%D1%8B">
              Алгоритм Кнута для победы в игре Быки и коровы
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
