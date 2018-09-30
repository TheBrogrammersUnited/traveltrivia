package com.masesk.traveltrivia;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.parser.Parser;
import org.scribe.model.Request;
import org.scribe.model.Response;
import org.scribe.model.Verb;
import java.util.LinkedList;
import java.util.Locale;
import java.util.Queue;


public class QuestionScene extends Activity {
    private LinearLayout layout;
    private TextView question;
    private TextView answeredView;
    private TextView askedView;
    private Queue<Question> questions;
    private Button []answerButtons = new Button[4];
    private TextToSpeech tts;
    private String[] answerList = {"A", "Bee", "See", "Dee"};
    private boolean doneWithRequest = true;
    private int questionsAsked = 0;
    private int corrAnswers = 0;
    private LinearLayout.LayoutParams p;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_scene);
        layout = (LinearLayout)findViewById(R.id.layout);
        layout.setBackgroundColor(Color.WHITE);
        questions = new LinkedList<Question>();
        question = new TextView(getApplicationContext());
        askedView = new TextView(getApplicationContext());
        answeredView = new TextView(getApplicationContext());
        p = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        p.weight = 1;
        tts= new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int i) {

            }
        });

        tts.setLanguage(Locale.US);
        question.setText("PLEASE WAIT...");
        layout.addView(question);

        for(int i = 0; i < answerButtons.length; i++){
            answerButtons[i] = new Button(getApplicationContext());
            layout.addView(answerButtons[i]);
            answerButtons[i].setOnClickListener(new AnswerHandler());
            answerButtons[i].setWidth(0);
            answerButtons[i].setLayoutParams(p);
        }
        layout.setPadding(25, 25, 25, 25);
        question.setLayoutParams(p);
        askedView.setText(Integer.toString(questionsAsked));
        answeredView.setText(Integer.toString(corrAnswers));
        askedView.setTextSize(20);
        answeredView.setTextSize(20);
        answeredView.setTextColor(Color.GREEN);
        layout.addView(askedView);
        layout.addView(answeredView);

        if(!enoughQuestions()){
            new OTDBConnect().execute();
        }
        else{
            setUpQuestion();
        }

    }

    public boolean enoughQuestions(){
        //we also gotta check if we have internet connection
        if(questions.size() > 10){
            return true;
        }
        else{
            return false;
        }
    }

    public class AnswerHandler implements View.OnClickListener {
        @Override
        public void onClick(View view) {
            questionsAsked++;
            if(questions.remove().checkCorrectAnswer(((Button)view).getText().toString())){
                corrAnswers++;
                answeredView.setText(Integer.toString(corrAnswers));
            }
            askedView.setText(Integer.toString(questionsAsked));

            if(!enoughQuestions()){
                if(doneWithRequest) {
                    doneWithRequest = false;
                    new OTDBConnect().execute();
                }
                }
            else{
                setUpQuestion();
               }
        }
    }

    public class OTDBConnect extends AsyncTask<Void, Void, String> {
        @Override
        protected String doInBackground(Void... params) {
            final String URL = "https://opentdb.com/api.php?amount=50&type=multiple";
            Request request = new Request(Verb.GET, URL);
            Response resp = request.send();
            try {
                JSONObject jObject = new JSONObject(resp.getBody());

            }catch (JSONException e){

            }
            return resp.getBody();
        }
        @Override
        protected void onPostExecute(String result) {
            Question question;
            String[] answers;
            try {

                JSONObject jObject = new JSONObject(result);
                JSONArray jArray = jObject.getJSONArray("results");
                for(int i = 0; i < jArray.length(); i++) {
                    question = new Question();
                    answers = new String[4];
                    JSONObject temp = jArray.getJSONObject(i);
                    question.setQuestion(temp.getString("question"));
                    answers[0] = Parser.unescapeEntities(temp.getString("correct_answer"), true);
                    JSONArray wrongs = new JSONArray(temp.getString("incorrect_answers"));
                    for(int j = 0; j < wrongs.length(); j++){
                        answers[j+1] = Parser.unescapeEntities(wrongs.getString(j), true);
                    }
                    question.setAnswers(answers);
                    questions.add(question);
                }
                doneWithRequest = true;
                setUpQuestion();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }


    }

    public void setUpQuestion(){
        tts.stop();
        question.setText(questions.peek().getQuestion());
        question.setTextSize(20);
        tts.speak(questions.peek().getQuestion(), TextToSpeech.QUEUE_ADD, null);

        for(int i = 0; i < questions.peek().getAnswers().length; i++){
            tts.speak(answerList[i], TextToSpeech.QUEUE_ADD, null);
            tts.speak(questions.peek().getAnswers()[i], TextToSpeech.QUEUE_ADD, null);
           answerButtons[i].setText(questions.peek().getAnswers()[i]);
        }
    }

}
