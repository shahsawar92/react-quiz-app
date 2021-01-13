import React from 'react'
import { ListGroup } from 'react-bootstrap'

type props={
    question: string;
    answers: string[];
    callback: any;
    userAnswer:any;
    questionNumber:number;
    totalQuestions: number;
}

export const Question_card: React.FC<props>=({question,answers,callback,userAnswer,questionNumber,totalQuestions}) =>{
         return (
        <div>
            <p>Questions: {questionNumber} / {totalQuestions}
               </p> 
            <ListGroup >
                <ListGroup.Item disabled> <span dangerouslySetInnerHTML={{__html: question}} ></span> </ListGroup.Item>
            {answers.map(answer=>(
            <ListGroup.Item action
            disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}></span>
                        

            </ListGroup.Item>
            ) )}
          </ListGroup>
            
               
        </div>
    )
}
