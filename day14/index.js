#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});
console.clear();

const answerCallback = (answer)=> {
    if(answer === 'y')
    {
        console.log("yes!! Thank you");
        rl.close();
    }
    else if(answer === 'n')
    {
        console.log("No!! sorry");
        rl.close();
    }
    else
    {
        console.log('y나 n만 입력해주세요.');
        rl.question('예제가 재밌습니까? (y/n)',answerCallback);
    }
}
rl.question('예제가 재밌습니까? (y/n)',answerCallback);
