//
//  GameView.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit
import CoreGraphics

class GameView: UIView {
    var shouldSetupConstraints = true
    
    let btnWidthPercent: CGFloat = 0.5
    
    lazy var promptLabel: UILabel! =
        {
            let view = UILabel()
            view.translatesAutoresizingMaskIntoConstraints = false
            view.text = "Question loading..."
            view.textAlignment = .center
            view.numberOfLines = 4
            return view
    }()
    
    lazy var correctnessLabel: UILabel! =
        {
            let view = UILabel()
            view.translatesAutoresizingMaskIntoConstraints = false
            view.text = "Correct"
            view.textAlignment = .center
            view.numberOfLines = 4
            view.textColor = UIColor.green
            view.font = view.font.withSize(30)
            view.alpha = 0
            return view
    }()
    
    lazy var buttonA: UIButton! =
        {
            let index = 0
            let view = UIButton()
            view.translatesAutoresizingMaskIntoConstraints = false
            //view.addTarget(self, action: "buttonPressed", for: .touchDown)
            view.setTitle("Choice A is loading...", for: .normal)
            view.backgroundColor = UIColor.blue
            return view
    }()
    lazy var buttonB: UIButton! =
        {
            let index = 1
            let view = UIButton()
            view.translatesAutoresizingMaskIntoConstraints = false
            //view.addTarget(self, action: "buttonPressed", for: .touchDown)
            view.setTitle("Choice B is loading...", for: .normal)
            view.backgroundColor = UIColor.blue
            return view
    }()
    lazy var buttonC: UIButton! =
        {
            let index = 2
            let view = UIButton()
            view.translatesAutoresizingMaskIntoConstraints = false
            //view.addTarget(self, action: "buttonPressed", for: .touchDown)
            view.setTitle("Choice C is loading...", for: .normal)
            view.backgroundColor = UIColor.blue
            return view
    }()
    lazy var buttonD: UIButton! =
        {
            let index = 3
            let view = UIButton()
            view.translatesAutoresizingMaskIntoConstraints = false
            //view.addTarget(self, action: "buttonPressed", for: .touchDown)
            view.setTitle("Choice D is loading...", for: .normal)
            view.backgroundColor = UIColor.blue
            return view
    }()
    

    

    override init(frame: CGRect) {
        
        super.init(frame: frame)
        
        self.addSubview(correctnessLabel)
        self.addSubview(promptLabel)
        self.addSubview(buttonA)
        self.addSubview(buttonB)
        self.addSubview(buttonC)
        self.addSubview(buttonD)
        
        self.setNeedsUpdateConstraints()
        UIViewController.removeSpinner()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func updateConstraints() {
        if(shouldSetupConstraints) {
            // AutoLayout constraints
            shouldSetupConstraints = false
        }
        
        buttonAConstraints()
        buttonBConstraints()
        buttonCConstraints()
        buttonDConstraints()
        promptLabelConstraints()
        correctLabelConstraints()
        
        super.updateConstraints()
    }
    
    
    
    func buttonAConstraints(){
        // center button in page
        NSLayoutConstraint(
            item: buttonA,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: buttonA,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: btnWidthPercent,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: buttonA,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.6,
            constant: 0.0)
            .isActive = true
    }
    func buttonBConstraints(){
        // center button in page
        NSLayoutConstraint(
            item: buttonB,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: buttonB,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: btnWidthPercent,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: buttonB,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.7,
            constant: 0.0)
            .isActive = true
    }
    func buttonCConstraints(){
        // center button in page
        NSLayoutConstraint(
            item: buttonC,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: buttonC,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: btnWidthPercent,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: buttonC,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
    }
    func buttonDConstraints(){
        // center button in page
        NSLayoutConstraint(
            item: buttonD,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: buttonD,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: btnWidthPercent,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: buttonD,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.9,
            constant: 0.0)
            .isActive = true
    }
    
    
    func promptLabelConstraints() {
        // Center button in Page View
        NSLayoutConstraint(
            item: promptLabel,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 80% of the Page View Width
        NSLayoutConstraint(
            item: promptLabel,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: promptLabel,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.3,
            constant: 0.0)
            .isActive = true
    }
    
    func correctLabelConstraints() {
        // Center button in Page View
        NSLayoutConstraint(
            item: correctnessLabel,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 80% of the Page View Width
        NSLayoutConstraint(
            item: correctnessLabel,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: correctnessLabel,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.5,
            constant: 0.0)
            .isActive = true
    }
    
    
}
