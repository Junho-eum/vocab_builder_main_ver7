import { useState } from "react";
import "./App.css";
import React from "react";
import TextRevealProfile from "./TextRevealProfile";

// Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const vocabList = [
    {
      word: "모이다",
      synonym: "congregate",
      hint: "The students ____ed in the cafeteria",
    },
    {
      word: "타고난, 선천적인",
      synonym: "congenital",
      hint: "The ____ disease was present at birth",
    },

    {
      word: "마음에 드는, 성격에 맞는",
      synonym: "congenial",
      hint: "The ____ student was very friendly",
    },
    {
      word: "융합하다, 합체하다",
      synonym: "conflate",
      hint: "The two companies ____ed to form a new corporation",
    },
    {
      word: "도움이 되는",
      synonym: "conducive",
      hint: "The rainy weather was not ____ to a picnic",
    },
    {
      word: "이야기 변명등을 지어내다",
      synonym: "concot",
      hint: "The student ____ed an excuse for not doing his homework",
    },
    {
      word: "징벌이나 보복에 걸맞은",
      synonym: "condign",
      hint: "The ____ punishment was appropriate for the crime",
    },
    {
      word: "분류하다. 구획을 정하다",
      synonym: "compartmentalize",
      hint: "The teacher ____ed the students into groups",
    },
    {
      word: "먹을 수 있는",
      synonym: "comestible",
      hint: "The ____ mushroom was safe to eat",
    },
    {
      word: "우호적인 관계",
      synonym: "comity",
      hint: "The two countries had a ____ agreement",
    },
    {
      word: "칭찬하다",
      synonym: "commend",
      hint: "The teacher ____ed the student for his hard work",
    },
    {
      word: "통찰력이 있는",
      synonym: "clairvoyant",
      hint: "The ____ student was able to solve the problem quickly",
    },
    {
      word: "아우성, 소란",
      synonym: "clamor",
      hint: "The ____ of the crowd was deafening",
    },
    {
      word: "쪼개다, 틈을 내다",
      synonym: "cleave",
      hint: "The woodman ____ed the wood with an axe",
    },
    {
      word: "자비,관대함",
      synonym: "clemency",
      hint: "The judge showed ____ to the criminal",
    },
    {
      word: "소집단의, 배타적인",
      synonym: "cliquish",
      hint: "The ____ group did not allow new members",
    },
    {
      word: "영향력,힘",
      synonym: "clout",
      hint: "The politician had a lot of ____",
    },
    {
      word: "응고시키다",
      synonym: "coagulate",
      hint: "The blood ____ed after the injury",
    },
    {
      word: "왜곡시키다",
      synonym: "color",
      hint: "The politician tried to ____ the facts",
    },
    {
      word: "양심의 가책,뉘우침",
      synonym: "compunction",
      hint: "The king had ____ over his subjects",
    },
    {
      word: "위로, 조의를 표하다",
      synonym: "condole",
      hint: "The student ____ed with his friend over his loss",
    },
    {
      word: "묵과하다, 용서하다",
      synonym: "condone",
      hint: "The teacher ____ed the student's mistake",
    },
    {
      word: "중지,중단",
      synonym: "cessation",
      hint: "The ____ of the rain was a welcome relief",
    },
    {
      word: "지나치게 격식을 갖춘",
      synonym: "ceremonious",
      hint: "The ____ wedding was very formal",
    },
    {
      word: "원심력에 의한",
      synonym: "centrifugal",
      hint: "The ____ force pulled the object toward the center",
    },
    {
      word: "트집잡다",
      synonym: "cavil",
      hint: "This is not the time to cavil about the little details",
    },
    {
      word: "트집잡는",
      synonym: "captious",
      hint: "The ____ student was always complaining",
    },
    {
      word: "말의 호화로운 장식물",
      synonym: "caparison",
      hint: "The horse was covered in ____s",
    },
    {
      word: "위선적 말투",
      synonym: "cant",
      hint: "The politician's ____ was not convincing",
    },
    {
      word: "규범,기준",
      synonym: "canon",
      hint: "The ____ of the school was very strict",
    },
    {
      word: "헛소문,유언비어",
      synonym: "canard",
      hint: "It is almost impossible to stop a ____ from spreading",
    },
    {
      word: "무관심함,냉담함",
      synonym: "callous",
      hint: "The ____ student did not care about his grades",
    },
    {
      word: "감언으로 꾀서 ~하게 하다",
      synonym: "cajole",
      hint: "The student ____ed the teacher into giving him a good grade",
    },
    {
      word: "도당",
      synonym: "cabal",
      hint: "The ____ was planning to overthrow the government",
    },
    {
      word: "위협하다,강요하다",
      synonym: "bludgeon",
      hint: "The bully ____ed the student into giving him his lunch money",
    },
    {
      word: "이야기를 꺼내다, 발의하다",
      synonym: "broach",
      hint: "The student ____ed the idea of a field trip",
    },
    {
      word: "(느낌·경험이) 대리의[간접적인]",
      synonym: "vicarious",
      hint: "The student lived ____ly through his favorite character in the book",
    },
    {
      word: "(흔히 과장되게) 고상한, 상류층의[인 체하는]",
      synonym: "genteel",
      hint: "A live orchestra gave the event a ____ atmosphere",
    },
  ];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [wronglyAnswered, setWronglyAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [onStreak, setOnStreak] = useState(false);
  const shuffledVocabList = shuffle([...vocabList]);
  const [scoreList, setScoreList] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledWrongAnswers, setShuffledWrongAnswers] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState(
    vocabList.map((_, idx) => idx)
  );

  React.useEffect(() => {
    const savedScores = localStorage.getItem("scoreList");
    if (savedScores) {
      const sortedScores = JSON.parse(savedScores).sort(
        (a, b) => b.score - a.score
      );
      setScoreList(sortedScores);
    }
  }, []);


  const checkAnswer = () => {
    const isCorrect = inputValue === vocabList[index].synonym;
    const pointValue = 1; // Points for a correct answer

    if (isCorrect) {
      setStreak((prevStreak) => prevStreak + 1);
      setShowCorrectAnswer(false);
      setRemainingQuestions((prev) => prev.filter((i) => i !== index));
      // Check if user has a streak of 3 or more
      if (streak >= 2) {
        setOnStreak(true);
        setScore((prevScore) => prevScore + 3 * pointValue);
      } else {
        setScore((prevScore) => prevScore + pointValue);
      }

      setCorrectCount((prevCount) => prevCount + 1);

      // If answered correctly, remove from wronglyAnswered and shuffledWrongAnswers
      if (wronglyAnswered.includes(index)) {
        setWronglyAnswered((prev) => prev.filter((idx) => idx !== index));
        setShuffledWrongAnswers((prev) => prev.filter((idx) => idx !== index));
      }

      // Immediately proceed to the next question if the answer is correct
      moveToNextQuestion();
    } else {
      setStreak(0); // Reset the streak
      setOnStreak(false);
      setShowCorrectAnswer(true);
      if (!wronglyAnswered.includes(index)) {
        setWronglyAnswered((prev) => [...prev, index]);
      }
      setWrongCount((prevCount) => prevCount + 1);

      // Wait for 3 seconds before moving to the next question after a wrong answer
      setTimeout(() => {
        setShowCorrectAnswer(false);
        moveToNextQuestion();
      }, 3000);
    }
  };

  const moveToNextQuestion = () => {
    let newIndex;

    if (wronglyAnswered.includes(index) && shuffledWrongAnswers.length > 0) {
      const currPosition = shuffledWrongAnswers.indexOf(index);
      newIndex = shuffledWrongAnswers[currPosition + 1];
    } else if (remainingQuestions.length > 0) {
      // This ensures a random question is picked from the remaining questions
      newIndex =
        remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    } else {
      newIndex = undefined; // All questions have been answered
    }

    // If there's no new question (i.e., all questions have been answered correctly),
    // handle accordingly. For now, we're just resetting to the first question,
    // but you might want a more refined approach.
    if (newIndex === undefined) {
      newIndex = 0; // Or some logic to end the quiz.
    }

    setIndex(newIndex);
    setInputValue("");
  };

  const clearScores = () => {
    localStorage.removeItem("scoreList");
    setScoreList([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkAnswer();
    }
  };

  const totalWords = vocabList.length;
  const correctWidth = (correctCount / totalWords) * 100;
  const wrongWidth = (wrongCount / totalWords) * 100;

  const handleFinish = () => {
    const shouldRecord = window.confirm("Do you want to record your score?");
    if (shouldRecord) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}${currentDate.getHours() >= 12 ? "pm" : "am"}`;
      const newScore = { score, timestamp: formattedDate };

      const newScoreList = [...scoreList, newScore];
      setScoreList(newScoreList);
      localStorage.setItem("scoreList", JSON.stringify(newScoreList));
    }
  };

  return (
    <>
      <TextRevealProfile />

      <div className="vocab-section">
        {remainingQuestions.length === 1 && (
          <h2 style={{ textAlign: "center" }}>Last Question</h2>
        )}
        <h3>Intermed-08/01</h3>
        <p>Meaning: {vocabList[index].word}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the synonym"
          />
          <button onClick={checkAnswer}>Check</button>
          <button onClick={() => setShowHint(!showHint)}>Hint</button>
          <button
            onClick={handleFinish}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Finish
          </button>

          <button
            onClick={clearScores}
            style={{ position: "absolute", top: "10px", right: "120px" }}
          >
            Clear Scores
          </button>

          <div style={{ position: "absolute", top: "40px", right: "10px" }}>
            {scoreList.map((s, index) => (
              <div key={index}>
                Score: {s.score}{" "}
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "0.9em",
                    color: "grey",
                  }}
                >
                  {s.timestamp}
                </span>
              </div>
            ))}
          </div>
        </form>

        <div className={`score ${onStreak ? "glow" : ""}`}>Score: {score}</div>

        {/* Show the correct answer when the answer is wrong */}
        <div className={`correct-answer ${showCorrectAnswer ? "fade-in" : ""}`}>
          Correct Answer: {vocabList[index].synonym}
        </div>

        <div className={`hint ${showHint ? "show" : ""}`}>
          {vocabList[index].hint}
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress correct"
            style={{ width: `${correctWidth}%` }}
          ></div>
        </div>
        <div className="progress-bar">
          <div
            className="progress wrong"
            style={{ width: `${wrongWidth}%` }}
          ></div>
        </div>
      </div>
    </>
  );
              };

export default App;
