const { SlashCommandBuilder } = require('discord.js');
const db = require("../dbd.js");

var flavor = "menthol";

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

		const caller = interaction.user.id;

		const cUser = await db.User.findOne({ where: {userid: caller} });
		const juulHits = await db.Settings.findOne({ where: {setting: "juul_hits"} });

		

		if (interaction.options.getSubcommand() === 'hit') {
			

			if(cUser.has_juul){
				await interaction.reply(`${interaction.user.username} just hit the ${flavor} juul.`);
				console.log(juulHits)
			}else{
				await interaction.reply(`You don't have the juul..`);
			}

		} else if (interaction.options.getSubcommand() === 'pass') {
			// does user have juul (interaction.user.id)

			//yes: pass to other user


			// no: say you dont have juul
		} else if (interaction.options.getSubcommand() === 'pod') {
			const newflavor = interaction.options.getString("flavor");
			flavor = newflavor;
			await interaction.reply(`${interaction.user.username} put a ${newflavor} pod into the juul.`);
			// does user have juul (interaction.user.id)

			//yes:


			// no:
		} else if (interaction.options.getSubcommand() === 'steal') {
			// does user have juul (interaction.user.id)

			if(cUser.has_juul){
				await interaction.reply(`You already have it.`);
			}else{
				const juulOwner = await db.User.findOne({ where: {has_juul: true} });

				juulOwner.update({has_juul: false})
				cUser.update({has_juul: true})

				console.log(interaction.client.users.cache.get(juulOwner.userid));

				await interaction.reply(`${interaction.user.username} just stole the juul from ${interaction.client.users.cache.get(juulOwner.userid)}`)
			}

			// yes: you already have it 

			// no : steal juul
		}

		
	},
};
