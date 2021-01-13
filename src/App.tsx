import React,{useState} from 'react';
import { Alert, Button, Card, Container, Form,Navbar, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchQuestions , questionState} from './Components/API';
import {Question_card} from './Components/Question_card';


function App() {
  //object type for answer that store info for user answers
  type AnswerObj={
    question: string;
    answer: string;
    correct:boolean;
    correct_answer: string;
  }
//setting states for different properties
  const [loading, setloading] = useState(false);
  const [questions,setquestions]=useState<questionState[]>([]);
  const [score, setscore]= useState(0);
  const [number,setnumber]= useState(0);
  const [uans,setuans]= useState<AnswerObj[]>([   ]); 
  const [gameover, setgameover]=useState(true);
  const [defeculty,setdefeculty]=useState<string>("easy");
  const [noOfQuestion, setnoOFQuestion]=useState<number>(10);
  console.log("total:",noOfQuestion)
  //functionality as the start button is clicked
  const startquiz= async() => { 
    setloading(true);
    setgameover(false);
    const newQuestions= await fetchQuestions(noOfQuestion,defeculty);
    setquestions(newQuestions);
    setscore(0);
    setuans([]);
    setnumber(0);
    setloading(false);
   };
   // functionality as next question button is clicked
   const nextQ= async() => { 
       const nextQ=number+1; 
       if(nextQ === noOfQuestion )
       {
            setgameover(true);     
            
       }
       else
       {
            setnumber(nextQ)
       }
   };
   // User input diffeculty level
   const setvalue= (event:any)=>{
     setdefeculty(event.target.value);
   }
   // user input for total questions
   const noOfQuestions= (event:any)=>
   {
     setnoOFQuestion(event.target.value);
    }
    // check user answer and verify is corectness
    const checkAnswer=(event: React.MouseEvent<HTMLButtonElement>) =>{
       if(!gameover){
            const answer= event.currentTarget.innerText;
//            console.log(event.currentTarget.innerText)
            const correct = questions[number].correct_answer===answer;
       if(correct){
            setscore(score + 1)
       }

       const AnswerObj={
            question: questions[number].question,
            answer,
            correct,
            correct_answer:questions[number].correct_answer
       }
       setuans(prev=>[...prev, AnswerObj])
     }
};
  return (
    <Container >
         {/* heading name */}
         <Navbar bg="dark" variant="dark">
               <Navbar.Brand >QUIZ</Navbar.Brand>
</Navbar>
       
       <br /><br />
       {/* start button  */}
       { gameover || uans.length == noOfQuestion ?(
        <div>
              <div className="mb-2">
               <Button variant="outline-success" size="lg" onClick={startquiz}>
                    Start Quiz
               </Button>
               </div>
               <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select level</Form.Label>
                    <Form.Control as="select" title="Select level" onChange={setvalue}  defaultValue={defeculty}>
                    <option value="easy">EASY</option>
                    <option value="medium">MEDIUM</option>
                    <option value="hard">HARD</option>
               </Form.Control>
               </Form.Group>    
               
               <Form.Group controlId="formBasicPassword">
               <Form.Label>Questions</Form.Label>
               <Form.Control type="number" onChange={noOfQuestions} placeholder="Number of Questions" />
               </Form.Group>
        </div>
           ) : null }

   {/* loading or preloader */}
   { loading? (
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> 
   ) : null} 

<Card className="text-center">
   { !gameover && !loading ? (
        <Card.Header>  <Alert  variant="success">
              <h2>SCORE: {score}</h2>
       </Alert></Card.Header>
   ) : null }

  
    <Card.Body>
   { !loading && !gameover && uans.length !== noOfQuestion ? (
         
    <Card.Text><Question_card 
        questionNumber= {number+1}
        totalQuestions={noOfQuestion}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={uans ? uans[number]:undefined}
        callback={checkAnswer}
        /></Card.Text>
   ) : null 
   }
    
    {!gameover && !loading && uans.length===number+1 && number!==noOfQuestion-1?(        
        <button onClick={nextQ}>Next Question</button> 
   ) : null}</Card.Body>
  
</Card>
    </Container>
  );
}

export default App;
