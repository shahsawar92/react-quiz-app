import { shuffleArray } from "./utilities";

export const fetchQuestions= async(amount:number, difficulty:string)=>{
    const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data= await(await fetch(endpoint)).json();
    return data.results.map((question: Question)=>(
        {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer ] )
        }
    ) )} 

export type Question ={
    category:string;
    correct_answer:string;
    incorrect_answers:string[];
    difficulty:string;
    question: string;
    type: string;
};

export type questionState= Question & {answers:string[]};