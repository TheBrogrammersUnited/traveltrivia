//
//  GameViewController.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit
import Foundation
import AVFoundation

class GameViewController: UIViewController {
    var gameView:GameView!
    
    var questions: [Question] = []
    
    var waitingHTTP = false
    
    var prevRightAnswer:String?
    
    let synth = Speaker()
    
    let lettersArr :[String] = ["A.","B.","C.","D."]
    
    let todoEndpoint: String = "https://opentdb.com/api.php?amount=50&type=multiple"
    
    var doneSpeakingDelegate: ((Bool?)->Void)? = nil
    
    var otdb : OpenTriviaDbInterface? = nil
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        view = GameView()
        otdb = OpenTriviaDbInterface()
        gameView = view as! GameView
        synth.setController(c: self)
        
        print("test")
        UIViewController.displaySpinner(onView: view.self)
        waitingHTTP = true
        otdb!.makeGetCall(apiRequest: todoEndpoint, onComplete: onCompleteGetTrivia)
        
        var voiceRec = VoiceRecognitionController()
        voiceRec.Init()
        voiceRec.StartListening()
    
    }
    
    func onCompleteGetTrivia()
    {
        waitingHTTP = false
        let qArr = otdb!.getQuestions()
        questions.append(contentsOf:qArr)
        getNextQuestion()
    }
    
    public func finishedSpeakingUtterance()
    {
        print("Done from GameViewCotrl")
        doneSpeakingDelegate?(nil)
    }
    
    
    func getNextQuestion()
    {
        UIViewController.removeSpinner()
        if self.questions.count > 0
        {
            self.setupNextQuestion()
        }
        let questionStr = self.questions[0].question.stringByDecodingHTMLEntities
        
        self.doneSpeakingDelegate = nil
        self.synth.speakStr(string: questionStr)
        
        var answers: [String] = []
        self.gameView.promptLabel.text = questionStr
        let randomIndex = arc4random_uniform(4)
        let buttons = [self.gameView.buttonA, self.gameView.buttonB, self.gameView.buttonC, self.gameView.buttonD]
        var j = 0
        for i in 0...3{
            if i != randomIndex{
                let answer = self.lettersArr[i] + " - " + self.questions[0].incorrect_answers[j].stringByDecodingHTMLEntities
                answers.append(answer)
                self.doneSpeakingDelegate = nil
                self.synth.speakStr(string: answer)
                buttons[i]?.setTitle(answer, for: .normal)
                j += 1
                buttons[i]!.removeTarget(nil, action: nil, for: .allEvents)
                self.prevRightAnswer = self.questions[0].correct_answer.stringByDecodingHTMLEntities
                buttons[i]!.addTarget(self, action: #selector(self.wrongAnswerPressed), for: .touchDown)
            }
            else{
                let answer = self.lettersArr[i] + " - " + self.questions[0].correct_answer.stringByDecodingHTMLEntities
                answers.append(answer)
                self.doneSpeakingDelegate = nil
                self.synth.speakStr(string: answer)
                buttons[i]?.setTitle(answer, for: .normal)
                buttons[i]!.removeTarget(nil, action: nil, for: .allEvents)
                buttons[i]!.addTarget(self, action: #selector(self.rightAnswerPressed), for: .touchDown)
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
                waitingHTTP = true
                otdb!.makeGetCall(apiRequest: todoEndpoint, onComplete: onCompleteGetTrivia)
            }
        }
    }
    
    var tries = 0
    let maxTries = 2
    func wrongAnswerPressed()
    {
        // questionFail means all tries are exhausted
        var questionFail: Bool = false
        self.tries += 1
        if(self.tries >= self.maxTries)
        {
            questionFail = true
        }
        self.synth.synth.stopSpeaking(at: AVSpeechBoundary.immediate)
        fadeAllAwayAnim
        {
            (nil) in
            self.fadeInCorrectnessLabel(isCorrect: false, onComplete:
            {
                (nil) in
                
                print("wrong")
                
                self.synth.speakStr(string: self.gameView.correctnessLabel.text!)
                
                self.doneSpeakingDelegate =
                {
                    (nil) in
                    self.fadeOutCorrectnessLabel(onComplete:
                    {
                        (nil) in
                        if questionFail
                        {
                            self.tries = 0
                            self.getNextQuestion()
                        }
                        self.fadeAllInAnim(onComplete:
                        {
                            (nil) in
                            
                        })
                    })
                }
            })
        }
    }

    
    func rightAnswerPressed()
    {
        self.synth.synth.stopSpeaking(at: AVSpeechBoundary.immediate)
        fadeAllAwayAnim
        {
            (nil) in
            self.fadeInCorrectnessLabel(isCorrect: true, onComplete:
            {
                (nil) in
                print("right")
                
                self.synth.speakStr(string: self.gameView.correctnessLabel.text!)
                
                self.doneSpeakingDelegate =
                {
                    (nil) in
                    self.tries = 0
                    self.fadeOutCorrectnessLabel(onComplete:
                    {
                        (nil) in
                        self.getNextQuestion()
                        self.fadeAllInAnim(onComplete:
                        {
                            (nil) in
                        })
                    })
                }
            })
        }
    }
    
    func fadeInCorrectnessLabel(isCorrect:Bool,onComplete:@escaping ((Bool?)->Void))
    {
        if isCorrect{
            self.gameView.correctnessLabel.textColor = UIColor.green
            self.gameView.correctnessLabel.text = "Correct"
        }
        else {
            self.gameView.correctnessLabel.textColor = UIColor.red
            if self.tries >= self.maxTries
            {
                self.gameView.correctnessLabel.text = "Wrong answer. The right answer was \"\(self.prevRightAnswer!)\""
            }
            else
            {
                self.gameView.correctnessLabel.text = "Wrong answer."
            }
        }
        UIView.animate(withDuration: 0.5, delay: 0.0, options: UIViewAnimationOptions.curveEaseIn, animations:
            {
                self.gameView.correctnessLabel.alpha = 1
            }, completion: onComplete)
    }
    
    func fadeOutCorrectnessLabel(onComplete:@escaping ((Bool?)->Void))
    {
        UIView.animate(withDuration: 0.5, delay: 0.5, options: UIViewAnimationOptions.curveEaseOut, animations:
        {
                self.gameView.correctnessLabel.alpha = 0
        }, completion: onComplete)
    }
    
    func fadeAllAwayAnim(onComplete:@escaping ((Bool?)->Void))
    {
        UIView.animate(withDuration: 0.5, delay: 0.0, options: UIViewAnimationOptions.curveEaseOut, animations:
            {
                self.gameView.promptLabel.alpha = 0
                self.gameView.buttonA.alpha = 0
                self.gameView.buttonB.alpha = 0
                self.gameView.buttonC.alpha = 0
                self.gameView.buttonD.alpha = 0
            }, completion: onComplete)
    }
    
    func fadeAllInAnim(onComplete:@escaping ((Bool?)->Void))
    {
        UIView.animate(withDuration: 0.5, delay: 0.0, options: UIViewAnimationOptions.curveEaseIn, animations:
            {
                self.gameView.promptLabel.alpha = 1
                self.gameView.buttonA.alpha = 1
                self.gameView.buttonB.alpha = 1
                self.gameView.buttonC.alpha = 1
                self.gameView.buttonD.alpha = 1
        }, completion: onComplete)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
