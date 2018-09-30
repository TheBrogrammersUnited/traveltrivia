//
//  GameViewController.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit
import Foundation
class GameViewController: UIViewController {
    var gameView:GameView!
    
    var questions: [Question] = []
    
    var waitingHTTP = false
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        view = GameView()
        gameView = view as! GameView
        
        print("test")
        UIViewController.displaySpinner(onView: view.self)
        makeGetCall()
    }
    
    func getNextQuestion()
    {
        DispatchQueue.main.async
        {
            UIViewController.removeSpinner()
            if self.questions.count > 0
            {
                self.setupNextQuestion()
            }
            let questionStr = self.questions[0].question.stringByDecodingHTMLEntities
            var answers: [String] = []
            self.gameView.promptLabel.text = questionStr
            let randomIndex = arc4random_uniform(4)
            let buttons = [self.gameView.buttonA, self.gameView.buttonB, self.gameView.buttonC, self.gameView.buttonD]
            var j = 0
            for i in 0...3{
                if i != randomIndex{
                    let answer = self.questions[0].incorrect_answers[j].stringByDecodingHTMLEntities
                    answers.append(answer)
                    buttons[i]?.setTitle(answer, for: .normal)
                    j += 1
                    buttons[i]!.addTarget(self, action: "wrongAnswerPressed", for: .touchDown)
                }
                else{
                    let answer = self.questions[0].correct_answer.stringByDecodingHTMLEntities
                    answers.append(answer)
                    buttons[i]?.setTitle(answer, for: .normal)
                    buttons[i]!.addTarget(self, action: "rightAnswerPressed", for: .touchDown)
                }
            }
        }
    }
    
    func setupNextQuestion()
    {
        questions.remove(at: 0)
        if questions.count <= 10
        {
            if !waitingHTTP
            {
                makeGetCall()
            }
        }
    }
    
    var tries = 0
    func wrongAnswerPressed()
    {
        print("wrong")
        tries += 1
        if(tries >= 2)
        {
            tries = 0
            getNextQuestion()
        }
        
    }
    
    func rightAnswerPressed()
    {
        print("right")
        tries = 0
        getNextQuestion()
    }
    
    func makeGetCall() {
        waitingHTTP = true
        
        // Set up the URL request
        let todoEndpoint: String = "https://opentdb.com/api.php?amount=50&type=multiple"
        guard let url = URL(string: todoEndpoint) else {
            print("Error: cannot create URL")
            return
        }
        let urlRequest = URLRequest(url: url)
        
        // set up the session
        let config = URLSessionConfiguration.default
        let session = URLSession(configuration: config)
        
        // make the request
        let task = session.dataTask(with: urlRequest) {
            (data, response, error) in
            self.waitingHTTP = false
            // check for any errors
            guard error == nil else {
                print("error calling GET on \(todoEndpoint)")
                print(error!)
                return
            }
            // make sure we got data
            guard let responseData = data else {
                print("Error: did not receive data")
                return
            }
            // parse the result as JSON, since that's what the API provides
            do {
                guard let todo = try JSONSerialization.jsonObject(with: responseData, options: [])
                    as? [String: Any] else {
                        print("error trying to convert data to JSON")
                        return
                }
                // now we have the todo
                // let's just print it to prove we can access it
                print("The todo is: " + todo.description)
                
                guard let results = try? JSONDecoder().decode(Results.self, from: responseData) else {
                    print("Error: Couldn't decode data into Results")
                    return
                }
                
                print("answers:")
                for r in results.results{
                    self.questions.append(r)
                    
                }
                self.getNextQuestion()
                
            } catch  {
                print("error trying to convert data to JSON")
                return
            }
        }
        task.resume()
    }
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
