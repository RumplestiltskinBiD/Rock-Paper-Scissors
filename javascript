let forge = require('node-forge');
let key = forge.random.getBytesSync(32)
let iv = forge.random.getBytesSync(32)
let cipher = forge.cipher.createCipher('AES-ECB', key)
cipher.start({iv: iv})
cipher.update(forge.util.createBuffer( 'some data' ))
cipher.finish()
let encrypted = cipher.output
let encryptedResult = encrypted.toHex()
let crypto = require('crypto')

function stonePaperScissors() {

    let turns = process.argv.slice(2)

    let hasDuplicates = new Set(turns)
    if(turns.length<3 || turns.length%2 === 0){
        return console.log('Should be at least three arguments and odd count of arguments!')
    } else if(hasDuplicates.size !== turns.length){
        return console.log('Should be no duplicates!')
    }

    turns.push('exit', 'help')
    let turnsForTable = turns.slice(0, -2)

    let turnsMenu = () => turns.forEach(function (item, index) {
        item === 'exit' ? index = 0 : item === 'help' ? index = "?" : index = index + 1
        console.log(index + ' - ' + item)
    })

    let min = 1;
    let max = turns.length -2;
    let computerMove = Math.floor(Math.random() * (max - min)) + min;
    let computerChoice = turns[computerMove-1]
    let keyAndComp = computerChoice + encryptedResult

    let newHash = crypto.createHash('SHA3-256')
    let reallyFinal = newHash.update(keyAndComp).digest('hex')
    console.log('HMAC: ' + reallyFinal)
    console.log('Available moves:')
    turnsMenu()
    const readline = require('readline')

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question(`Enter your move: `, function (data) {
        class whoWins {

            myArr() {
                let playerChoice = turns[data - 1]
                let onlyTurns = turns.slice(0, -2)

                while (playerChoice !== onlyTurns[Math.floor(onlyTurns.length / 2) ]) {
                    let newArr = onlyTurns.splice(0, 1)
                    onlyTurns.push(newArr[0])
                }
                onlyTurns.indexOf(playerChoice) > onlyTurns.indexOf(computerChoice) ?
                    console.log('Your move: ' + playerChoice, "\n", 'Computer move: ' + computerChoice, "\n", 'You win!', "\n",'HMAC key:', keyAndComp) :
                    onlyTurns.indexOf(playerChoice) < onlyTurns.indexOf(computerChoice) ?
                        console.log('Your move: ' + playerChoice, "\n", 'Computer move: ' + computerChoice, "\n", 'Computer wins!', "\n",'HMAC key:', keyAndComp) :
                        console.log('Your move: ' + playerChoice, "\n", 'Computer move: ' + computerChoice, "\n", 'Draw!', "\n",'HMAC key: ', keyAndComp)
            }
        }
        class Table {
            display(array) {
                let result = {}
                for (let i = 0; i < array.length; i++) {
                    let sliceArr = array.slice()
                    let row = {}
                    while (array[i] !== sliceArr[Math.floor(sliceArr.length / 2) ]) {
                        let newArr = sliceArr.splice(0, 1)
                        sliceArr.push(newArr[0])
                    }
                    for (let k = 0; k < sliceArr.length; k++) {
                        let newI = sliceArr.indexOf(array[i])
                        row[sliceArr[k]] = newI < k ? "defeat" : newI > k ? "win" : "draw"
                    }
                    result[array[i]] = row
                }
                return result
            }
        }
let ourWinner = new whoWins()
        let table = new Table()

            if(data === '?') {
            console.table(table.display(turnsForTable))
        }

        if(data == 0){
            return console.log('See you again!') + rl.close()
        } if(turns[data-1] === undefined) {

                turnsMenu()
                rl.setPrompt('Choose from above\n')
                rl.prompt()
                rl.on('line', (newData) => {
                    data = newData
                if(turns.includes(turns[data - 1])) {
                    return ourWinner.myArr() + rl.close()
                } else {
                    rl.setPrompt('You should choose from above\n')
                    rl.prompt()
                }
            })
        }
        else {
            return ourWinner.myArr() + rl.close()
        }
    })
}

stonePaperScissors(process.argv.slice(2));
