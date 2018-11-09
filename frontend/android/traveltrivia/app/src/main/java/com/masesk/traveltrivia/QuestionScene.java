package com.masesk.traveltrivia;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.speech.tts.TextToSpeech;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.view.Gravity;
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
import java.io.File;
import java.io.IOException;
import java.lang.ref.WeakReference;
import java.util.LinkedList;
import java.util.Locale;
import java.util.Queue;

import edu.cmu.pocketsphinx.Assets;
import edu.cmu.pocketsphinx.Hypothesis;
import edu.cmu.pocketsphinx.RecognitionListener;
import edu.cmu.pocketsphinx.SpeechRecognizer;
import edu.cmu.pocketsphinx.SpeechRecognizerSetup;


public class QuestionScene extends Activity implements RecognitionListener {
    private LinearLayout layout;
    private TextView question;
    private TextView answeredView;
    private TextView askedView;
    private Queue<Question> questions;
    private Activity qS = this;
    private SpeechRecognizer recognizer;
    private Button []answerButtons = new Button[4];
    private TextToSpeech tts;
    private String[] answerList = {"A", "Bee", "See", "Dee"};
    private boolean doneWithRequest = true;
    private int questionsAsked = 0;
    private int corrAnswers = 0;
    private LinearLayout.LayoutParams p;
    private Button changedButton;
    private static final int PERMISSIONS_REQUEST_RECORD_AUDIO = 1;
    private boolean stopListening = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_scene);
        layout = (LinearLayout)findViewById(R.id.layout); //find main layout from activity_question_scene.xml
        layout.setBackgroundResource(R.drawable.background);
        questions = new LinkedList<Question>();
        question = new TextView(getApplicationContext());
        askedView = new TextView(getApplicationContext());
        answeredView = new TextView(getApplicationContext());


        question.setBackgroundResource(R.drawable.question);
        question.setGravity(Gravity.CENTER);
        question.setPadding(25, 25, 25, 25);
        question.setTextColor(Color.BLACK);
        p = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        p.weight = 1;
        LinearLayout scoreContainer = new LinearLayout(getApplicationContext());
        scoreContainer.setOrientation(LinearLayout.HORIZONTAL);
        scoreContainer.setLayoutParams(p);
        askedView.setLayoutParams(p);
        answeredView.setLayoutParams(p);
        askedView.setGravity(Gravity.CENTER);
        answeredView.setGravity(Gravity.CENTER);
        scoreContainer.addView(askedView);
        scoreContainer.addView(answeredView);
        askedView.setBackgroundResource(R.drawable.button_incorrect);
        askedView.setTextColor(Color.WHITE);
        answeredView.setTextColor(Color.WHITE);
        askedView.setTextSize(30);
        answeredView.setTextSize(30);
        answeredView.setBackgroundResource(R.drawable.button_correct);
        tts= new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int i) {
                if (i == TextToSpeech.SUCCESS) {
                    int result = tts.setLanguage(Locale.getDefault());
                    setUpQuestion();
                }
                else if (i == TextToSpeech.ERROR) {
                    Toast.makeText(getApplicationContext(), "Error occurred while initializing Text-To-Speech engine", Toast.LENGTH_LONG).show();
                }
            }
        });

        question.setText("PLEASE WAIT...");
        layout.addView(question);

        for(int i = 0; i < answerButtons.length; i++){
            p.setMargins(25, 25, 25, 25);
            answerButtons[i] = new Button(getApplicationContext());
            layout.addView(answerButtons[i]);
            answerButtons[i].setOnClickListener(new AnswerHandler());
            answerButtons[i].setWidth(0);
            answerButtons[i].setTextSize(20);
            answerButtons[i].setLayoutParams(p);
            answerButtons[i].setBackgroundResource(R.drawable.button);
            answerButtons[i].setLayoutParams(p);
        }
        layout.setPadding(25, 25, 25, 25);
        question.setLayoutParams(p);
        askedView.setText(Integer.toString(questionsAsked));
        answeredView.setText(Integer.toString(corrAnswers));
        layout.addView(scoreContainer);
        int permissionCheck = ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.RECORD_AUDIO);
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, PERMISSIONS_REQUEST_RECORD_AUDIO);
        }
        else{
            new SetupTask(this).execute();
        }

        if(!enoughQuestions()){
            new OTDBConnect().execute();
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
            setButtonsEnabled(false);
            if(questions.peek().checkCorrectAnswer(((Button)view).getText().toString())){
                ttsSpeak("Correct", TextToSpeech.QUEUE_FLUSH);
                corrAnswers++;
                answeredView.setText(Integer.toString(corrAnswers));
                view.setBackgroundResource(R.drawable.button_correct);
            }
            else{
                questionsAsked++;
                askedView.setText(Integer.toString(questionsAsked));
                ttsSpeak("Incorrect...correct answer is " + questions.peek().getCorrectAnswer(), TextToSpeech.QUEUE_FLUSH);
                view.setBackgroundResource(R.drawable.button_incorrect);
            }
            questions.remove();
            changedButton = (Button)view;
            if(!enoughQuestions()){
                if(doneWithRequest) {
                    doneWithRequest = false;
                    new OTDBConnect().execute();
                }
            }
            waitAfterCorrect();
        }
    }

    public void setButtonsEnabled(boolean st){
        for(int i = 0; i < answerButtons.length; i++){
            answerButtons[i].setEnabled(st);
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
        question.setText(questions.peek().getQuestion());
        question.setTextSize(25);
        ttsSpeak(questions.peek().getQuestion(), TextToSpeech.QUEUE_ADD);

        for(int i = 0; i < questions.peek().getAnswers().length; i++){
            ttsSpeak(answerList[i], TextToSpeech.QUEUE_ADD);
            ttsSpeak(questions.peek().getAnswers()[i], TextToSpeech.QUEUE_ADD);
           answerButtons[i].setText(questions.peek().getAnswers()[i]);
        }
    }

    public void switchToError(){
        Intent myIntent = new Intent(qS, Error.class);
        qS.startActivity(myIntent);
    }

    public void waitAfterCorrect(){
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                setButtonsEnabled(true);
                changedButton.setBackgroundResource(R.drawable.button);
                recognizer.startListening("listen");
                stopListening = false;
                setUpQuestion();


            }
        }, 4000);
    }

    /************************************************************************************
     *
     *              SPEECH RECOGNITION IMPLEMENTATION
     *
     ************************************************************************************/

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions, @NonNull  int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PERMISSIONS_REQUEST_RECORD_AUDIO) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Recognizer initialization is a time-consuming and it involves IO,
                // so we execute it in async task
                new SetupTask(this).execute();
            } else {
                finish();
            }
        }
    }
    @Override
    public void onDestroy() {
        super.onDestroy();

        if (recognizer != null) {
            recognizer.cancel();
            recognizer.shutdown();
        }
    }

    private class SetupTask extends AsyncTask<Void, Void, Exception> {
        WeakReference<QuestionScene> activityReference;
        SetupTask(QuestionScene activity) {
            this.activityReference = new WeakReference<>(activity);
        }
        @Override
        protected Exception doInBackground(Void... params) {
            try {
                Assets assets = new Assets(activityReference.get());
                File assetDir = assets.syncAssets();
                activityReference.get().setupRecognizer(assetDir);
            } catch (IOException e) {
                return e;
            }
            return null;
        }
        @Override
        protected void onPostExecute(Exception result) {
            if (result != null) {
                switchToError();
            } else {
                recognizer.startListening("listen", 1000);
            }
        }
    }


    private void setupRecognizer(File assetsDir) throws IOException {
        // The recognizer can be configured to perform multiple searches
        // of different kind and switch between them

        recognizer = SpeechRecognizerSetup.defaultSetup()
                .setAcousticModel(new File(assetsDir, "en-us-ptm"))
                .setDictionary(new File(assetsDir, "cmudict-en-us.dict"))

                .setRawLogDir(assetsDir) // To disable logging of raw audio comment out this call (takes a lot of space on the device)

                .getRecognizer();
        recognizer.addListener(this);

        /* In your application you might not need to add all those searches.
          They are added here for demonstration. You can leave just one.
         */

        // Create keyword-activation search.
        recognizer.addKeyphraseSearch("listen", "listen");

        // Create grammar-based search for selection between demos
        File menuGrammar = new File(assetsDir, "menu.gram");
        recognizer.addGrammarSearch("options", menuGrammar);

    }

    @Override
    public void onBeginningOfSpeech() {

    }

    @Override
    public void onEndOfSpeech() {
        recognizer.stop();
        recognizer.startListening("listen");
    }

    @Override
    public void onPartialResult(Hypothesis hypothesis) {
        if (hypothesis == null)
            return;
        String text = hypothesis.getHypstr();
        if(text.equals("listen")){
            recognizer.stop();
            recognizer.startListening("options");
        }
    }

    @Override
    public void onResult(Hypothesis hypothesis) {
        if (hypothesis != null) {
            String text = hypothesis.getHypstr();
            handleOptionUsingVR(text);
            recognizer.stop();
            if(!stopListening) {
                ttsSpeak("listening", TextToSpeech.QUEUE_FLUSH);
                recognizer.startListening("options");
            }
        }
    }

    @Override
    public void onError(Exception e) {

    }

    @Override
    public void onTimeout() {
        recognizer.startListening("listen");
    }

    public void handleOptionUsingVR(String option){
            if(!option.equals("listen")){
                stopListening = true;
                switch (option){
                    case "ay":
                        ttsSpeak("You selected " + answerList[0], TextToSpeech.QUEUE_FLUSH);
                        setAnswerUsingVR(0);
                        break;
                    case "bee":
                        ttsSpeak("You selected " + answerList[1], TextToSpeech.QUEUE_FLUSH);
                        setAnswerUsingVR(1);
                        break;
                    case "see":
                        ttsSpeak("You selected " + answerList[2], TextToSpeech.QUEUE_FLUSH);
                        setAnswerUsingVR(2);
                        break;
                    case "dee":
                        ttsSpeak("You selected " + answerList[3], TextToSpeech.QUEUE_FLUSH);
                        setAnswerUsingVR(3);
                        break;
                }

            }
    }



    public void setAnswerUsingVR(int buttonIndex){
        setButtonsEnabled(false);
        if(questions.peek().checkCorrectAnswer(answerButtons[buttonIndex].getText().toString())){
            ttsSpeak("Correct", TextToSpeech.QUEUE_FLUSH);
            corrAnswers++;
            answeredView.setText(Integer.toString(corrAnswers));
            answerButtons[buttonIndex].setBackgroundResource(R.drawable.button_correct);
        }
        else{
            questionsAsked++;
            askedView.setText(Integer.toString(questionsAsked));
            ttsSpeak("Incorrect...correct answer is " + questions.peek().getCorrectAnswer(), TextToSpeech.QUEUE_FLUSH);
            answerButtons[buttonIndex].setBackgroundResource(R.drawable.button_incorrect);
        }
        questions.remove();
        changedButton = answerButtons[buttonIndex];
        if(!enoughQuestions()){
            if(doneWithRequest) {
                doneWithRequest = false;
                new OTDBConnect().execute();
            }
        }
        waitAfterCorrect();
    }

    public void ttsSpeak(String input, int speakType){
        //speakType speaks only that word is TextToSpeeh.QUEUE_FLUSH
        //and Stacks them if TextToSpeech.QUEUE_ADD
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tts.speak(input,speakType,null,null);
        } else {
            tts.speak(input, speakType, null);
        }
    }




}
