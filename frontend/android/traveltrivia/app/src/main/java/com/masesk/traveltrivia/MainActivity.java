package com.masesk.traveltrivia;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.facebook.AccessToken;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.Profile;
import com.facebook.login.LoginManager;
import org.json.JSONException;
import org.json.JSONObject;


public class MainActivity extends Activity  {
    private LinearLayout mainLayout;
    private Button startPlaying;
    private Button logout;
    private TextView welcome;
    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.main);
        mainLayout = (LinearLayout)findViewById(R.id.MainLayout);
        mainLayout.setBackgroundColor(Color.WHITE);
        startPlaying = new Button(getApplicationContext());
        logout = new Button(getApplicationContext());
        welcome = new TextView(getApplicationContext());
        startPlaying.setText("Start Playing");
        startPlaying.setBackgroundResource(R.drawable.background);
        logout.setBackgroundResource(R.drawable.background);
        mainLayout.addView(startPlaying);
        mainLayout.addView(logout);
        mainLayout.addView(welcome);
        logout.setText("Logout");
        AccessToken accessToken = AccessToken.getCurrentAccessToken();
        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
        if(isLoggedIn){
            GraphRequest request = GraphRequest.newMeRequest(accessToken, new GraphRequest.GraphJSONObjectCallback() {
                @Override
                public void onCompleted(JSONObject object, GraphResponse response) {

                        welcome.setText("Welcome " + Profile.getCurrentProfile().getFirstName() + " " + Profile.getCurrentProfile().getLastName());


                }
            });
            Bundle parameters = new Bundle();
            parameters.putString("fields", "id,email,birthday,friends");
            request.setParameters(parameters);
            request.executeAsync();
        }
        startPlaying.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), QuestionScene.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LoginManager.getInstance().logOut();
                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        });

    }

}
