"use client";
import React, { useState } from "react";
const fuzzysort = require('fuzzysort');

export default function bot() {
  // Sample FAQ data
  const faq = {
    "What is your return policy?": "Our return policy allows returns within 30 days of purchase.",
    "How can I track my order?": "You can track your order by logging into your account on our website.",
    "Do you offer international shipping?": "Yes, we offer international shipping to select countries.",
    "How to sell your old phone on OruPhones?" : "To sell your old phone on OruPhones, follow these steps: 1. Go to the OruPhones website and click on the Sell Now button. 2. Select your location and enter your device details. 3. Enter your expected price for the device. 4. Verify your device using the OruPhones app. 5. Receive offers from buyers and arrange a meet-up to complete the sale",
    "what is my name ?":"my name is piyush saini"
  };

  // Function to match question with FAQ
  function matchQuestion(question) {
    const matchedQuestions = fuzzysort.go(question, Object.keys(faq));
    if (matchedQuestions.length > 0) {
        let response = "";
        matchedQuestions.forEach(match => {
            const faqKey = match.target;
            const faqAnswer = faq[faqKey];
            response += `${faqAnswer}\n\n`;
        });
        return response;
    } else {
        return "Sorry, I don't have information on that. Please contact support for assistance.";
    }
  }

  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = () => {
    setIsLoading(true);
    const answer = matchQuestion(userInput);

    setChatHistory(prevChat => [
      ...prevChat,
      { role: 'user', content: userInput },
      { role: 'assistant', content: answer }
    ]);

    setUserInput('');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex col justify-center items-center">
      <div className="w-full max-w-screen-md mg-white p-4 rounded-lg shadow-md">
        <div className="md-4">
          <div className="text-4xl font-blod text-blue-800 mb-2">
            Chat-bot assistant
          </div>
          <p className="text-gray-600 text-lg">
            The future of AI is here! This is a simple interactive chat-bot built using the OpenAI API
          </p>
        </div>

        <div className="mb-4" style={{ height: "400px", overflow: "auto" }}>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`${message.role === 'user' ? 'text-left' : 'text-right'
                } mb-2`}
            >
              <div className={`rounded-full p-2 max-w-md mx-4 inline-block
               ${message.role === 'user' ? 'bg-blue-300 text-blue-800' : 'bg-green-300 text-green-800'}`}>
                {message.role === 'user' ? 'H' : 'AI'}
              </div>
              <div className={`max-w-md mx-4 my-2 inline-block 
              ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} pd-2 rounded-md`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress} // Added onKeyPress event handler
            className="flex-1 p-2 rounded-l-lg"
          />
          {isLoading ? (
            <div className="bg-blue-500 text-white p-2 rounded-r-lg animate-pulse">
              Loading...
            </div>
          ) : (
            <button onClick={handleUserInput} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-300">
              Ask
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
