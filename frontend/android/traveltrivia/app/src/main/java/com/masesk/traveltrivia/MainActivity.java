package com.masesk.traveltrivia;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.media.FaceDetector;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import com.facebook.FacebookSdk;
import com.facebook.login.LoginManager;


public class MainActivity extends Activity  {
    private LinearLayout mainLayout;
    private Button startPlaying;
    private Button logout;
    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.main);
        mainLayout = (LinearLayout)findViewById(R.id.MainLayout);
        mainLayout.setBackgroundColor(Color.WHITE);
        startPlaying = new Button(getApplicationContext());
        logout = new Button(getApplicationContext());
        startPlaying.setText("Start Playing");
        startPlaying.setBackgroundResource(R.drawable.background);
        logout.setBackgroundResource(R.drawable.background);
        mainLayout.addView(startPlaying);
        mainLayout.addView(logout);
        logout.setText("Logout");
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
