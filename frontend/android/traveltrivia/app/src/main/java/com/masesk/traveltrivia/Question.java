package com.masesk.traveltrivia;

import android.text.Html;
import android.util.Log;
import android.widget.Toast;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Entities;
import org.jsoup.parser.Parser;

public class Question {
    private String question;
    private String[] answers;

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
    }
}
