//
//  MenuView.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit

class MenuView: UIView {

    var shouldSetupConstraints = true
    
    lazy var textField: UITextField! =
        {
            let view = UITextField()
            view.translatesAutoresizingMaskIntoConstraints = false
            view.borderStyle = .roundedRect
            view.textAlignment = .center
            
            return view
    }()
    
    lazy var button: UIButton! =
        {
            let view = UIButton()
            view.translatesAutoresizingMaskIntoConstraints = false
            //view.addTarget(self, action: "buttonPressed", for: .touchDown)
            view.setTitle("Start", for: .normal)
            view.backgroundColor = UIColor.blue
            return view
    }()
    
    lazy var label: UILabel! =
        {
            let view = UILabel()
            view.translatesAutoresizingMaskIntoConstraints = false
            view.text = "Trivia App"
            view.textAlignment = .center
            return view
    }()
    
    
    override init(frame: CGRect) {
        
        super.init(frame: frame)
        
        //self.addSubview(textField)
        self.addSubview(button)
        self.addSubview(label)
        self.setNeedsUpdateConstraints()
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func updateConstraints() {
        if(shouldSetupConstraints) {
            // AutoLayout constraints
            shouldSetupConstraints = false
        }
        
        //textFieldConstraints()
        buttonConstraints()
        labelConstraints()
        
        super.updateConstraints()
    }
    
    
    // fucking ios garbage positioning functions
    //
    func textFieldConstraints()
    {
        // center text field relative to pg view
        NSLayoutConstraint(
            item: textField,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // set text field width to be 80% of page
        NSLayoutConstraint(
            item: textField,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // set text field Y to be 10% down from da top
        NSLayoutConstraint(
            item: textField,
            attribute: .top,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.1,
            constant: 0.0)
            .isActive = true
    }
    
    func buttonConstraints(){
        // center button in page
        NSLayoutConstraint(
            item: button,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: button,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: 0.3,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: button,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 0.9,
            constant: 0.0)
            .isActive = true
    }
    
    
    func labelConstraints() {
        // Center button in Page View
        NSLayoutConstraint(
            item: label,
            attribute: .centerX,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 80% of the Page View Width
        NSLayoutConstraint(
            item: label,
            attribute: .width,
            relatedBy: .equal,
            toItem: self,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: label,
            attribute: .centerY,
            relatedBy: .equal,
            toItem: self,
            attribute: .centerY,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
    }

}
