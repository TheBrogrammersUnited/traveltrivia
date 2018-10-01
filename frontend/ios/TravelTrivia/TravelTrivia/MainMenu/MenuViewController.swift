//
//  MainViewController.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/29/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit

class MenuViewController: UIViewController, UITextFieldDelegate {
    var menuView:MenuView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view = MenuView()
        menuView = view as! MenuView
        menuView.button.addTarget(self, action: "buttonPressed", for: .touchDown)
        menuView.textField.delegate = self
    }
    
    func textFieldShouldReturn(_ textField: UITextField)-> Bool
    {
        // dismiss keyboard by making text field resign
        // first responder
        menuView.textField.resignFirstResponder()
        
        // returns false. instead of adding a line break, the text field
        // resigns
        return false
    }
    
    override func updateViewConstraints() {
        super.updateViewConstraints()
    }

    func buttonPressed()
    {
        menuView.label.text = "Loading..."
        UIViewController.displaySpinner(onView: self.view)
        
        view.window!.rootViewController = GameViewController()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
