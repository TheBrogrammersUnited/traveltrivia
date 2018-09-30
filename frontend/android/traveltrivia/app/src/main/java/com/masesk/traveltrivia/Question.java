package com.masesk.traveltrivia;
import org.jsoup.parser.Parser;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class Question {
    private String question;
    private String[] answers;
    private String correctAnswer;

    public Question(){

    }
    public Question(String question, String[] answers){
            this.question = question;
            this.answers = answers;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {

        this.question = Parser.unescapeEntities(question, true);
    }

    public String[] getAnswers() {
        return answers;
    }

    public void setAnswers(String[] answers) {
        this.answers = answers;
        correctAnswer = answers[0];
        shuffle();
    }

    public void shuffle(){
        List<String> list = Arrays.asList(answers);
        Collections.shuffle(list);
    }

    public boolean checkCorrectAnswer(String answer){
        if(answer.equals(this.correctAnswer)){
            return true;
        }
        else{
            return false;
        }
    }
}
