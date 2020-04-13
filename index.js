require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

var roles = ['carry', 'mid', 'offlane', 'bida bida support', 'pulubi']

let playerQueue = [];
//choosing a random joke from the array

const queue = function(user) {
	if (playerQueue.includes(user)) {
		return 'kasali ka na boy'
	} else if (playerQueue.length >= 4) {
		return 'puno na ser sali ka maya'
	} else {
		playerQueue.push(user);
			return [
				"Welcome to the agawan-medkit-party",
				`\`${playerQueue.length}/4\``,
				playerQueue
			].join('\n')
	}
}

const shuffle = function(array) {
	let currentIndex = array.length, temporaryValue, randomIndex
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random()*currentIndex);
		currentIndex-=1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

const assignRoles = function() {
	if (playerQueue.length == 3) {		
		let i = 0;
		shuffle(roles);
		let finalRoles = 'Roles: \n';
		while (i < playerQueue.length) {
			finalRoles += `${playerQueue[i]} : ${roles[i]}` + '\n'
			i++;
		}
		return finalRoles
	} else {
		return 'kulang pa players'
	}
}
const leaveQueue = function(user) {
	if (playerQueue.includes(user)) {
		let position = playerQueue.indexOf(user);
		playerQueue.splice(position,1);
		let remainingQueue = 'so long and goodbye\nRemaining soldiers:\n';
		remainingQueue += playerQueue
		return remainingQueue
	} else {
		return 'di ka naman kasali eh'
	}
}
//Turn the discordjs on to listen to a message
    client.on('message', (message) => {
        if (message.content.includes('!queue')) {
        	message.channel.send(queue(message.author));
        }
        if (message.content.includes('!roles')) {
        	message.channel.send(assignRoles())
        }
        if (message.content.includes('!leave')) {
        	message.channel.send(leaveQueue(message.author));
        }
    });    

const token = process.env.TOKEN;
client.login(token);