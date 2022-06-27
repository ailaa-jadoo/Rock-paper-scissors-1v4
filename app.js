const express = require('express')
const app = express();

// Kind of properties of a step
const Selections = [
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    }
]

// randomizer that give rock ,paper and scissor randomly whenever called
const randomizer = () => {
    const arr = ['rock', 'paper', 'scissors']
    return arr[Math.floor(Math.random() * 3)]
}

// Basic player info
const Players = [
    {
        name: 'player1',
        step: '' // rock, paper, scissors
    },
    {
        name: 'player2',
        step: '' // rock, paper, scissors
    },
    {
        name: 'player3',
        step: '' // rock, paper, scissors
    },
    {
        name: 'player4',
        step: '' // rock, paper, scissors
    }
]

// Our main GET API
app.get('/game/start', (req, res) => {

    // Empty result object
    const result = {}

    // For 50 iterations
    for (let k = 1; k <= 50; k++) {

        // Assigning each player a step using randomizer for each iteration
        Players[0].step = randomizer();
        Players[1].step = randomizer();
        Players[2].step = randomizer();
        Players[3].step = randomizer();

        // A data array for each iteration
        const data = []

        data.push(`Iteration number ${k} data:-`)

        // Iterating over each possible condition
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                // Condition so that to skip player facing itself
                if (i != j) {
                    const Player_i_step = Players[i].step
                    const Player_j_step = Players[j].step

                    // Condition for draw/Tie
                    const condition = Player_i_step === Player_j_step;

                    if (condition === true) {
                        data.push(`Tie of ${Players[i].name} with ${Player_i_step} step and ${Players[j].name} with ${Player_j_step} step`)
                    } else {
                        Selections.forEach(selection => {
                            if (Player_i_step === selection.name) {
                                if (selection.beats === Player_j_step) {
                                    data.push(`${Players[j].name} with ${Player_j_step} step Won against ${Players[i].name} with ${Player_i_step} step`)
                                }
                                else {
                                    data.push(`${Players[i].name} with ${Player_i_step} step Won against ${Players[j].name} with ${Player_j_step} step`)
                                }
                            }
                        });
                    }
                }

                // Condition when Player faces itself
                else {
                    data.push("Brothers Don't fights")
                }
            }
        }

        // Adding data to the object result in index k
        result[k] = data;
    }

    // Sending the data back
    res.json(result)
})

app.listen(5000, () => {
    console.log("Listening at port 5000")
})

