package com.masesk.traveltrivia;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.TextView;

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

    public class OTDBConnect extends AsyncTask<String, String, String> {
        @Override
        protected String doInBackground(String... strings) {
            final String URL = "https://opentdb.com/api.php?amount=10";
            Request request = new Request(Verb.GET, URL);
            Response resp = request.send();
            return resp.getBody();
        }
        @Override
        protected void onPostExecute(String result) {
            txt = (TextView)findViewById(R.id.textView);
            txt.setText(result);
        }
    }
}
