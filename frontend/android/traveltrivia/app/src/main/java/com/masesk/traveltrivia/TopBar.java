package com.masesk.traveltrivia;

import android.app.Fragment;
import android.media.Image;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by radon on 7/20/2017.
 */

public class TopBar extends Fragment {
    private TextView username;
    private TextView score;
    private TextView coins;
    private ImageView profilePic;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.top_bar, container, false);
        profilePic =(ImageView)getActivity().findViewById(R.id.profilePic);
        username = (TextView)rootView.findViewById(R.id.username);
        score = (TextView)rootView.findViewById(R.id.score);
        coins = (TextView)rootView.findViewById(R.id.coins);
        username.setText(MainActivity.getName());
        score.setText(MainActivity.getCorrect() + "/" + MainActivity.getTotal());
        // Inflate the layout for this fragment
        return rootView;
    }

    public void setInfo(String correct, String total){
        score.setText(correct + "/" + total);
        MainActivity.setScore(correct, total);
    }


}
