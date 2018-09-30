package com.masesk.traveltrivia;

public class Question {
    private String question;
    private String[] answers;

    public Question(){

    }
    public Question(String question, String[] answers){

    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String[] getAnswers() {
        return answers;
    }

    public void setAnswers(String[] answers) {
        this.answers = answers;
    }
}
