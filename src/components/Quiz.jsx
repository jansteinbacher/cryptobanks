import React, { useState } from 'react';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';

function Quiz() {

  // objects for questions 
  const questions = [
    {
      id: 1,
      questionText: 'Who was the author of the original Bitcoin Whitepaper?',
      answerOptions: [
        { answerText: 'Elon Musk', isCorrect: false },
        { answerText: 'Satoshi Nakamoto', isCorrect: true },
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Steve Jobs', isCorrect: false },
      ],
      image: image1,
    },
    {
      id: 2,
      questionText: 'What is the maximum amount of bitcoins mined?',
      answerOptions: [
        { answerText: '21 million', isCorrect: true },
        { answerText: '1 million', isCorrect: false },
        { answerText: '42 million', isCorrect: false },
        { answerText: 'none', isCorrect: false },
      ],
      image: image2,
    },
    {
      id: 3,
      questionText: 'When was Bitcoin used first?',
      answerOptions: [
        { answerText: '2009', isCorrect: true },
        { answerText: '2008', isCorrect: false },
        { answerText: '2001', isCorrect: false },
        { answerText: '2011', isCorrect: false },
      ],
      image: image3,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const nextQuestion = currentQuestion + 1;
    

  
  // display if answer is correct or not and set score 
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setSelectedAnswer('correct');
    } else {
      setSelectedAnswer('incorrect');
    }

    // check if last question and if true display final score
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      }, 0);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen gradient-bg-welcome'>
      <div className='md:w-1/2 p-8 space-y-4'>
        <div className='bg-white shadow-md rounded-lg p-8 '>
          
          {/*show score only if last question is answered, display button that sets the constants to startsettings*/}
          {showScore ? (
            <div className='text-3xl font-bold text-green-500 mb-4 '>
              <p className='flex justify-center items-center'>You scored {score} out of {questions.length}!</p>
             <div className='flex justify-center items-center my-8'>
                 <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setShowScore(false);
              setScore(0);
              setCurrentQuestion(0);
              setSelectedAnswer(null);
            }}
          >
            Restart Quiz
          </button>
          </div>
            </div>
          ) : (
            <>
              <div className='text-2xl text-center font-bold mb-4 flex justify-center items-center'>
                {questions[currentQuestion].questionText}
              </div>
              <div className='flex justify-center items-center my-4'>
              <div className='w-72 h-72 rounded-lg'>
                <img
                  src={questions[currentQuestion].image}
                  alt='question'
                  className={`object-cover h-full w-full transition-all m-auto`}
                />
              </div>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-8'>
                {/*display the current question use handleAnswerOptionClick to check if answer is right*/}
                {questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <button
                      key={answerOption.answerText}
                      className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all `}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                      disabled={selectedAnswer !== null}
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className='md:w-1/2 p-8 space-y-4'>
        <div className='bg-white shadow-md rounded-lg p-8 '>
          <div className='text-2xl font-bold mb-4 flex justify-center items-center'>Score</div>
          <div className='text-3xl font-bold text-green-500 flex justify-center items-center'>{score}</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;