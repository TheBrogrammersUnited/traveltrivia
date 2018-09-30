package com.masesk.traveltrivia;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.scribe.model.Request;
import org.scribe.model.Response;
import org.scribe.model.Verb;

public class Test extends Activity {
    TextView txt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        txt = (TextView)findViewById(R.id.textView);
        txt.setText("PLEASE WAIT..");
        new OTDBConnect().execute();
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
            txt.setText("");
            StringBuilder builder = new StringBuilder();
            try {
                JSONObject jObject = new JSONObject(result);
                JSONArray jArray = jObject.getJSONArray("results");
                for(int i = 0; i < jArray.length(); i++) {
                    JSONObject temp = jArray.getJSONObject(i) ;
                    builder.append(temp.getString("question") + "\n\n");
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            txt.setText(builder.toString());
        }
    }
}
