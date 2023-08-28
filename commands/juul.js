const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('juul')
		.setDescription('Get info about a user or a server!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('hit')
				.setDescription('Hits the juul.')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('steal')
				.setDescription('Steals the juul'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('pod')
				.setDescription('Sets the pod type')),
				
	async execute(interaction) {
		await interaction.reply('we sipping juice 4 life buddy');
	},
};