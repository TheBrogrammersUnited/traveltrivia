//
//  MainViewController.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/29/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit

class MainViewController: UIViewController, UITextFieldDelegate {

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        textField.delegate = self
        
        
        view.addSubview(textField)
        view.addSubview(button)
        view.addSubview(label)
        view.setNeedsUpdateConstraints()

        
    }
    
    func textFieldShouldReturn(_ textField: UITextField)-> Bool
    {
        // dismiss keyboard by making text field resign
        // first responder
        textField.resignFirstResponder()
        
        // returns false. instead of adding a line break, the text field
        // resigns
        return false
    }
    
    override func updateViewConstraints() {
        textFieldConstraints()
        buttonConstraints()
        labelConstraints()
        super.updateViewConstraints()
        
    }
    
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
        view.addTarget(self, action: "buttonPressed", for: .touchDown)
        view.setTitle("Press me!", for: .normal)
        view.backgroundColor = UIColor.blue
        return view
    }()
    
    lazy var label: UILabel! =
    {
        let view = UILabel()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.text = "Hello World!"
        view.textAlignment = .center
        return view
    }()
    
    
    func buttonPressed()
    {
        label.text = "You pressed me!"
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
            toItem: view,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // set text field width to be 80% of page
        NSLayoutConstraint(
            item: textField,
            attribute: .width,
            relatedBy: .equal,
            toItem: view,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // set text field Y to be 10% down from da top
        NSLayoutConstraint(
            item: textField,
            attribute: .top,
            relatedBy: .equal,
            toItem: view,
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
            toItem: view,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 30% of the Page View Width
        NSLayoutConstraint(
            item: button,
            attribute: .width,
            relatedBy: .equal,
            toItem: view,
            attribute: .width,
            multiplier: 0.3,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: button,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: view,
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
            toItem: view,
            attribute: .centerX,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
        
        // Set Width to be 80% of the Page View Width
        NSLayoutConstraint(
            item: label,
            attribute: .width,
            relatedBy: .equal,
            toItem: view,
            attribute: .width,
            multiplier: 0.8,
            constant: 0.0)
            .isActive = true
        
        // Set Y Position Relative to Bottom of Page View
        NSLayoutConstraint(
            item: label,
            attribute: .centerY,
            relatedBy: .equal,
            toItem: view,
            attribute: .centerY,
            multiplier: 1.0,
            constant: 0.0)
            .isActive = true
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}
