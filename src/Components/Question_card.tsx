import React from 'react'

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
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <p>
                {answers.map(answer=>(
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}></span>
                        </button>
                    </div>
                ) )}
                </p>        
        </div>
    )
}
