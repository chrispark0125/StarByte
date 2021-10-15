const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const token = config.token
const prefix = config.prefix

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const MONGO_URI = config.dbkey

const mongoose = require( 'mongoose' )

//  에러방지 옵션설정
mongoose.connect(MONGO_URI, {
} ) .then(() => console.log( "MongoDB Connected success !!" ))
    .catch(err => console.log( err ))
	
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token)