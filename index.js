import readlineSync from 'readline-sync';
import colors from 'colors';

import openai from './config/openai.js';

function print(message, user) {
    switch(user) {
        case 'intro':
            console.log(colors.bold.green(message));
            break;
        case 'bot':
            console.log(colors.green('Bot: ') + message);    
            break;
        default:
            console.log(colors.red(message));
    }
}

async function main() {
    print('Welcome to the Chatbot!', 'intro');
    print('You can start chatting with the bot.', 'intro');
    print('Type "exit" to exit.', 'intro');

    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '));
 
        try {

            // Build messages to send entire chat history to openAI api
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            
            messages.push({ role: 'user', content: userInput });

            const completion = await openai.chat.completions.create({
                messages,
                model: 'gpt-3.5-turbo-1106',
            });

            const botResponse = completion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                print(botResponse, 'bot');
                return;
            }

            print(botResponse, 'bot');

            // Update history with user input and bot response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', botResponse]);
        } catch (error) {
            print(error);
        }
    }
}

main();