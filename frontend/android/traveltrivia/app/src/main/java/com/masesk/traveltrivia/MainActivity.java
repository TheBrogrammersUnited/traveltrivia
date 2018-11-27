package com.masesk.traveltrivia;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.facebook.AccessToken;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginManager;
import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;


public class MainActivity extends Activity  {
    private LinearLayout mainLayout;
    private Button startPlaying;
    private Button logout;
    private TextView usernameField;
    private TextView winLossScore;
    private static String name = "";
    private static String total = "";
    private static String correct = "";
    private static String id = "";
    private LinearLayout topMain;
    private LinearLayout loadingLayout;
    private ProgressBar progressBar;
    private Button logoutFb;
    private static ImageView profilePic;
    private TopBar topbar;
    private static LoginReady loginReady = new LoginReady();
    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.main);
        mainLayout = (LinearLayout)findViewById(R.id.MainLayout);
        mainLayout.setVisibility(View.INVISIBLE);
        topMain = (LinearLayout)findViewById(R.id.topMain);
        loadingLayout = (LinearLayout)findViewById(R.id.loadingLayout);
        logoutFb = (Button)findViewById(R.id.logoutFb);
        progressBar = (ProgressBar)findViewById(R.id.progressBar);
        startPlaying = new Button(getApplicationContext());
        logout = new Button(getApplicationContext());
        topbar = (TopBar) getFragmentManager().findFragmentById(R.id.fragment);
        mainLayout.addView(startPlaying);
        mainLayout.addView(logout);
        loginReady.setListener(new LoginReady.ChangeListener() {
            @Override
            public void onChange() {
                topMain.removeView(loadingLayout);
                mainLayout.setVisibility(View.VISIBLE);
                mainLayout.setBackgroundResource(R.drawable.background);
                winLossScore = (TextView)findViewById(R.id.score);
                usernameField = (TextView)findViewById(R.id.username);
                profilePic = (ImageView)findViewById(R.id.profilePic);
                startPlaying.setText("Start Playing");
                startPlaying.setBackgroundResource(R.drawable.button);
                logout.setBackgroundResource(R.drawable.button);
                logout.setText("Logout");

                AccessToken accessToken = AccessToken.getCurrentAccessToken();
                boolean isLoggedIn = accessToken != null && !accessToken.isExpired();


                if(isLoggedIn){
                    ActivityCompat.requestPermissions(MainActivity.this, new String[] {
                                    Manifest.permission.ACCESS_FINE_LOCATION,
                                    Manifest.permission.ACCESS_COARSE_LOCATION },
                            1);
                    usernameField.setText(name);
                    winLossScore.setText(correct + "/" + total);
                    GraphRequest request = GraphRequest.newMeRequest(accessToken, new GraphRequest.GraphJSONObjectCallback() {
                        @Override
                        public void onCompleted(JSONObject object, GraphResponse response) {
                            try {
                                URL profile_picture = new URL("https://graph.facebook.com/" + AccessToken.getCurrentAccessToken().getUserId() + "/picture?type=normal");
                                Picasso.get().load(profile_picture.toString()).into(profilePic);
                                topbar.setProfilePicture(profilePic);

                            }catch (MalformedURLException e){

                            }
                        }
                    });
                    Bundle parameters = new Bundle();
                    parameters.putString("fields", "id,email,birthday,friends");
                    request.setParameters(parameters);
                    request.executeAsync();
                }
                else{
                    logout();
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
                        loginReady.setReady(false);
                        logout();
                    }
                });

            }
        });
        if(loginReady.isReady()){
            loginReady.setReady(true);
        }
        logoutFb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                logout();
            }
        });


    }


    public static void setInfo(String id, String name, String correct, String total){
        MainActivity.id = id;
        MainActivity.name = name;
        MainActivity.correct = correct;
        MainActivity.total = total;
    }

    public static void setReady(){
        loginReady.setReady(true);
    }

    public void logout(){
        LoginManager.getInstance().logOut();
        Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    public static String getName(){
        return name;
    }
    public static String getTotal(){
        return total;
    }
    public static String getCorrect(){
        return correct;
    }

    public static void setScore(String correct, String total){
        MainActivity.correct = correct;
        MainActivity.total = total;
    }



}
