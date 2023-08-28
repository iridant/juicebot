const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('juul')
		.setDescription('Get info about a user or a server!')
		.addSubcommand(subcommand =>
			subcommand.setName('hit')
				.setDescription('Hits the juul.')
		).addSubcommand(subcommand =>
			subcommand.setName('pass')
				.setDescription('Passes the juul.')
				.addUserOption(option => 
					option.setName('target')
						.setDescription('The user to pass to')
						.setRequired(true)
					)
		).addSubcommand(subcommand =>
			subcommand.setName('steal')
				.setDescription('Steals the juul')
		).addSubcommand(subcommand =>
			subcommand.setName('pod')
				.setDescription('Sets the pod type')
				.addStringOption(options => 
					options.setName("flavor")
						.setDescription("Flavor of pod to put into the juul")
						.setRequired(true)
				)
		),
				
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'hit') {
			await interaction.reply('hit juul');
		} else if (interaction.options.getSubcommand() === 'pass') {
			await interaction.reply('pass juul');
		} else if (interaction.options.getSubcommand() === 'pod') {
			await interaction.reply('set flavor of juul');
		} else if (interaction.options.getSubcommand() === 'steal') {
			await interaction.reply('steal juul');
		}
	},
};