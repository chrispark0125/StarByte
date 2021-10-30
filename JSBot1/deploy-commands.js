const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');



const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies Ping!'),
	new SlashCommandBuilder().setName('agree').setDescription('Agrees with the terms of service.'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log(`Successfully registered application commands. : ${commands}`))
	.catch(console.error);
