//
//  LoadingIndicator.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit
class LoadingIndicator
{
    static var spinner:UIView? = nil
}
extension UIViewController {
    class func displaySpinner(onView : UIView) -> UIView {
        
        let spinnerView = UIView.init(frame: onView.bounds)
        LoadingIndicator.spinner = spinnerView
        spinnerView.backgroundColor = UIColor.init(red: 0.5, green: 0.5, blue: 0.5, alpha: 0.5)
        let ai = UIActivityIndicatorView.init(activityIndicatorStyle: .whiteLarge)
        ai.startAnimating()
        ai.center = spinnerView.center
        
        DispatchQueue.main.async {
            spinnerView.addSubview(ai)
            onView.addSubview(spinnerView)
        }
        
        return spinnerView
    }
    
    class func removeSpinner() {
        DispatchQueue.main.async {
            LoadingIndicator.spinner!.removeFromSuperview()
        }
    }
}
