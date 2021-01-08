import React,{useState} from 'react';
import { fetchQuestions ,Deficulty, questionState} from './Components/API';
import {Question_card} from './Components/Question_card';

function App() {
  
  type AnswerObj={
    question: string;
    answer: string;
    correct_answer: boolean;
    incorrect_answer: string;
  }

  const [loading, setloading] = useState(false);
  const [questions,setquestions]=useState<questionState[]>([]);
  const [score, setscore]= useState(0);
  const [number,setnumber]= useState(0);
  const [uans,setuans]= useState<AnswerObj[]>([]); 
  const [gameover, setgameover]=useState(true);

  const startquiz= async() => { 
    setloading(true);
    setgameover(false);
    const newQuestions= await fetchQuestions(10,Deficulty.HARD);
    setquestions(newQuestions);
    setscore(0);
    setuans([]);
    setnumber(0);
    setloading(false);
   };
  const nextQ= async() => {  };
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>) =>{
 
  }
  
  return (
    <div >
       <h1>Quiz</h1>
       { gameover ?(
        <button className="start button" onClick={startquiz}>Start</button>
   ) : null }
   { !gameover ? (
        <p>score</p>
   ) : null }
   { loading? (
        <p>loading</p> 
   ) : null} 
   { !loading && !gameover ? (
        <Question_card 
        questionNumber= {number+1}
        totalQuestions={10}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={uans ? uans[number]:undefined}
        callback={checkAnswer}
        />
   ) : null}
   {!gameover && !loading ?(        
        <button onClick={nextQ}>Next Question</button>
   ) : null}
    </div>
  );
}

export default App;
