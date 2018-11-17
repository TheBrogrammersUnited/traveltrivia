package com.masesk.traveltrivia;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import org.json.JSONException;
import org.json.JSONObject;
import org.scribe.model.Request;
import org.scribe.model.Response;
import org.scribe.model.Verb;

import java.util.Arrays;

public class LoginActivity extends Activity {
    private LinearLayout layout;
    private LoginButton loginButton;
    private CallbackManager callbackManager;
    private TextView tx;
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
            final String URL = "http://10.0.2.2:9000/find-user/" + AccessToken.getCurrentAccessToken().getUserId();
            Request request = new Request(Verb.GET, URL);
            Response resp = request.send();
            return resp.getBody();
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
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
