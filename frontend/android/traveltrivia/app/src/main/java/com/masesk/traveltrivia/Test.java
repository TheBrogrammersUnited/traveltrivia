package com.masesk.traveltrivia;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.ScrollView;
import android.widget.TextView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.scribe.model.Request;
import org.scribe.model.Response;
import org.scribe.model.Verb;

public class Test extends Activity {
    LinearLayout linearLayout;
    ScrollView scroll;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        //btn = (Button)findViewById(R.id.button);
        linearLayout = (LinearLayout)findViewById(R.id.linearview);
        scroll = (ScrollView)findViewById(R.id.scrollview);
        new OTDBConnect().execute();
//        btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                new OTDBConnect().execute();
//            }
//        });
    }

    //skeleton for Open Trivia Database


    public class OTDBConnect extends AsyncTask<Void, Void, String> {
        @Override
        protected String doInBackground(Void... params) {
            final String URL = "https://opentdb.com/api.php?amount=50";
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
            RadioGroup rdGroup;
            RadioButton rd;
            TextView tempText;
            StringBuilder builder = new StringBuilder();
            try {
                JSONObject jObject = new JSONObject(result);
                JSONArray jArray = jObject.getJSONArray("results");
                for(int i = 0; i < jArray.length(); i++) {
                    JSONObject temp = jArray.getJSONObject(i) ;
                    tempText = new TextView(getApplicationContext());
                    tempText.setText(temp.getString("question"));
                    linearLayout.addView(tempText);
                    rdGroup = new RadioGroup(getApplicationContext());
                    linearLayout.addView(rdGroup);
                    rd = new RadioButton(getApplicationContext());
                    rd.setText(temp.getString("correct_answer"));
                    rdGroup.addView(rd);
                    JSONArray wrongs = new JSONArray(temp.getString("incorrect_answers"));
                    for(int j = 0; j < wrongs.length(); j++){
                        rd = new RadioButton(getApplicationContext());
                        rd.setText(wrongs.get(j).toString());
                        rdGroup.addView(rd);
                    }

                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
