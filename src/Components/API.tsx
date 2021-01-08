import { shuffleArray } from "./utilities";

export const fetchQuestions= async(amount:number, difficulty:Deficulty)=>{
    const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data= await(await fetch(endpoint)).json();
    return data.results.map((question: Question)=>(
        {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer ] )
        }
    ) )} 
export enum Deficulty{
    EASY="easy",
    MEDIUM = "medium",
    HARD ="hard"
};
export type Question ={
    category:string;
    correct_answer:string;
    incorrect_answers:string[];
    difficulty:string;
    question: string;
    type: string;
};

export type questionState= Question & {answers:string[]};