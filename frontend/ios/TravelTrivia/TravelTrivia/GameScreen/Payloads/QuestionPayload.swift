//
//  QuestionPayload.swift
//  TravelTrivia
//
//  Created by Sean Castillo on 9/30/18.
//  Copyright © 2018 The Brogrammers. All rights reserved.
//

struct Question:Decodable
{
    let category: String
    let correct_answer: String
    let difficulty: String
    let incorrect_answers : [String]
    let question:String
    let type:String
}

struct Results:Decodable
{
    let results:[Question]
}
