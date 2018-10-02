//
//  OpenTriviaDbInterface.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 10/1/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

import UIKit

class OpenTriviaDbInterface {
    
    var questions:[Question] = []
    
    public func makeGetCall(apiRequest:String,  onComplete:@escaping ()->Void?)
    {
        
        // Set up the URL request
        guard let url = URL(string: apiRequest) else {
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
            // check for any errors
            guard error == nil else {
                print("error calling GET on \(apiRequest)")
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
                
                // This part only prints the results as a string
                guard let todo = try JSONSerialization.jsonObject(with: responseData, options: [])
                    as? [String: Any] else {
                        print("error trying to convert data to JSON")
                        return
                }
                print("The todo is: " + todo.description)
                
                // this part turns the results into data objects we can use
                guard let results = try? JSONDecoder().decode(Results.self, from: responseData) else {
                    print("Error: Couldn't decode data into Results")
                    return
                }
                
                print("answers:")
                for r in results.results{
                    self.questions.append(r)
                    
                }
                
                // todo (seanfcastillo) : so this is a problem. the data gets loaded, but the UI won't update fast. idk how to fix it
                DispatchQueue.main.async
                {
                        onComplete()
                        //getNextQuestion()
                }
                
            } catch  {
                print("error trying to convert data to JSON")
                return
            }
        }
        task.resume()
    }
    
    public func getQuestions() -> [Question]
    {
        return questions
    }

}
