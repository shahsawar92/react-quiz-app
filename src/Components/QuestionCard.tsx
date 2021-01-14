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

export const QuestionCard: React.FC<props>=({question,answers,callback,userAnswer,questionNumber,totalQuestions}) =>{
         return (
        <div>
            <div>Questions: {questionNumber} / {totalQuestions}</div>
            <ListGroup >
            <ListGroup.Item disabled> <span dangerouslySetInnerHTML={{__html: question}} ></span> </ListGroup.Item>
            {answers.map((answer,index)=>(
            <ListGroup.Item action key={index}
            disabled={userAnswer} onClick={callback} dangerouslySetInnerHTML={{__html:answer}}>
                            
            </ListGroup.Item>
            ) )}
          </ListGroup>
            
               
        </div>
    )
}
