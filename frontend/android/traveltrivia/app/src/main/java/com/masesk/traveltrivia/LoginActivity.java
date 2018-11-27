package com.masesk.traveltrivia;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.Profile;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;
import org.scribe.model.Request;
import org.scribe.model.Response;
import org.scribe.model.Verb;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

public class LoginActivity extends Activity {
    private LinearLayout layout;
    private LoginButton loginButton;
    private CallbackManager callbackManager;
    private final String awsURL = "http://ec2-18-188-247-247.us-east-2.compute.amazonaws.com";
    private final String awsPORT = ":9000";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        layout = (LinearLayout) findViewById(R.id.loginLayout);
        layout.setBackgroundResource(R.drawable.background);
        callbackManager = CallbackManager.Factory.create();
        loginButton = (LoginButton) findViewById(R.id.login_button);
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        loginButton.setReadPermissions(Arrays.asList("public_profile", "email", "user_birthday", "user_friends"));
        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
        if(isLoggedIn){
            loginButton.setVisibility(View.INVISIBLE);
            new checkLogin().execute();
            goMainScreen();
        }
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                loginButton.setVisibility(View.INVISIBLE);
                new checkLogin().execute();
                goMainScreen();
            }

            @Override
            public void onCancel() {
                Toast.makeText(getApplicationContext(), "Your login request was cancelled. Try again.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError(FacebookException error) {
                Toast.makeText(getApplicationContext(), "An error has occurred.", Toast.LENGTH_SHORT).show();
        }
        });

    }
    public class checkLogin extends AsyncTask<Void, Void, String>{
        @Override
        protected String doInBackground(Void... voids) {
            final String URL = awsURL + awsPORT + "/find-user/"+ AccessToken.getCurrentAccessToken().getUserId();
            Request request = new Request(Verb.GET, URL);
            Response resp = request.send();
            return resp.getBody();
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try {
                JSONObject jsonArray = new JSONObject(s);
                if(jsonArray.getString("_id").equals("-1")){
                    new createUser().execute();
                }
                else{
                    MainActivity.setInfo(jsonArray.getString("_id"), jsonArray.getString("name"), jsonArray.getString("correct"), jsonArray.getString("total"));
                    MainActivity.setReady();
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }


    public class createUser extends AsyncTask<Void, Void, String>{
        @Override
        protected String doInBackground(Void... voids) {

            final String URL = awsURL + awsPORT + "/add-user/";
            Request request = new Request(Verb.POST, URL);
            StringBuilder payLoad = new StringBuilder();
            payLoad.append("{ \"id\" : \"");
            payLoad.append(AccessToken.getCurrentAccessToken().getUserId());
            payLoad.append("\" , \"name\" : \" ");
            payLoad.append(Profile.getCurrentProfile().getFirstName());
            payLoad.append("\" }");
            request.addHeader("Content-Type", "application/json;charset=UTF-8");
            request.addPayload(payLoad.toString());
           // request.addBodyParameter("id", AccessToken.getCurrentAccessToken().getApplicationId());
            //request.addBodyParameter("name", Profile.getCurrentProfile().getFirstName());
            Response resp = request.send();
            return resp.getBody();
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                JSONObject jsonArray = new JSONObject(s);
                MainActivity.setInfo(jsonArray.getString("_id"), jsonArray.getString("name"), "0","0" );
                MainActivity.setReady();
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }
    public void goMainScreen(){
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_NO_ANIMATION);
        startActivity(intent);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
