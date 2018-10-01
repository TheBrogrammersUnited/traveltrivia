//
//  AVSpeechDelegateExtension.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit
import AVFoundation

class Speaker: NSObject {
    let synth = AVSpeechSynthesizer()
    
    var gController : GameViewController?
    
    override init() {
        super.init()
        synth.delegate = self
    }
    
    func speakStr(string: String)
    {
        let utterance = AVSpeechUtterance(string: string)
        utterance.voice = AVSpeechSynthesisVoice(language: "eng-GB")
        synth.speak(utterance)
        
    }
    
    func setController(c: GameViewController)
    {
        self.gController = c
    }
}

extension Speaker: AVSpeechSynthesizerDelegate {
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        
        print("done with utterance")
        self.gController!.finishedSpeakingUtterance()
    }

}
