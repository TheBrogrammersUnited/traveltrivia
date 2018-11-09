//
//  VoiceRecognitionController.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 10/25/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import Foundation

var lmPath:String? = nil;
var dicPath:String? = nil;

class VoiceRecognitionController
{
    func Init()
    {
        let lmGenerator = OELanguageModelGenerator()
        let words = ["silk", "fire", "loyalty", "favorable", "ask", "outfit", "conductor", "sit", "beard", "stream", "physics", "ridge", "decade", "enfix", "deadly", "flavor", "assertive", "circulate", "network", "battery", "economics", "clean", "spot", "consumer", "conference", "likely", "rise", "kettle", "enemy", "firefighter", "deliver", "pig", "sentiment", "jewel", "wheat", "tired", "smash", "demonstrate", "stay", "wrist", "suite", "ballot", "bloody", "worm", "possibility", "counter", "chair", "biography", "housewife", "low", "install", "happen", "peak", "shareholder", "biscuit", "coma", "coin", "owl", "virus", "dead", "even", "demonstrate", "sleeve", "relax", "bolt", "salesperson", "escape", "jail", "abandon", "form", "war", "absorb", "licence", "die", "hallway", "deviation", "dialect", "wriggle", "champagne", "system", "economy", "plain", "flag", "constitution", "government", "deteriorate", "secular", "duck", "nuclear", "ton", "suite", "dream", "grand", "variation", "exclusive", "estate", "relinquish", "brush", "punish", "scholar", "woman", "aviation", "have", "characteristic", "nonsense", "tube", "policeman", "choke", "wrong", "digital", "summer", "fire", "snub", "surround", "choose", "kidney", "fun", "Ayy", "Bee", "See", "Dee"]
        
        
        //["A", "B", "C", "D", "Answer", "Repeat", "Repeat the question", "Repeat the answers", "Repeat Question", "Repeat answers", "Stop", "Stop playing", "yes", "no"] // These can be lowercase, uppercase, or mixed-case.
        let name = "LanguageModelFiles"
        let err: Error! = lmGenerator.generateLanguageModel(from: words, withFilesNamed: name, forAcousticModelAtPath: OEAcousticModel.path(toModel: "AcousticModelEnglish"))
        
        if(err != nil) {
            print("Error while creating initial language model: \(err)")
        } else
        {
            lmPath = lmGenerator.pathToSuccessfullyGeneratedLanguageModel(withRequestedName: name) // Convenience method to reference the path of a language model known to have been created successfully.
            dicPath = lmGenerator.pathToSuccessfullyGeneratedDictionary(withRequestedName: name) // Convenience method to reference the path of a dictionary known to have been created successfully.
        }
    }

    func StartListening()
    {
        OELogging.startOpenEarsLogging() //Uncomment to receive full OpenEars logging in case of any unexpected results.
        do {
            try OEPocketsphinxController.sharedInstance().setActive(true) // Setting the shared OEPocketsphinxController active is necessary before any of its properties are accessed.
        } catch {
            print("Error: it wasn't possible to set the shared instance to active: \"\(error)\"")
        }
        
        OEPocketsphinxController.sharedInstance().startListeningWithLanguageModel(atPath: lmPath, dictionaryAtPath: dicPath, acousticModelAtPath: OEAcousticModel.path(toModel: "AcousticModelEnglish"), languageModelIsJSGF: false)

    }
}
