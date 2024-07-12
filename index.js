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

    // How it works:
    // const completion = await openai.chat.completions.create({
    //     messages: [{role: 'user', content: 'What is the capital of Iowa?'}],
    //     model: 'gpt-3.5-turbo-1106',
    // });

    // console.log(completion.choices[0].message.content);

    print('Welcome to the Chatbot!', 'intro');
    print('You can start chatting with the bot.', 'intro');
    print('Type "exit" to exit.', 'intro');

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: userInput }],
                model: 'gpt-3.5-turbo-1106',
            });

            const botResponse = completion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                // console.log(colors.green('Bot: ') + botResponse);
                print(botResponse, 'bot');
                return;
            }

            print(botResponse, 'bot');
            // console.log(colors.green('Bot: ') + botResponse);
        } catch (error) {
            print(error);
        }
    }
}

main().then();