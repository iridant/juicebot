const { SlashCommandBuilder } = require("discord.js");
const db = require("../util/dbd.js");

var flavor = "menthol";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hustle")
		.setDescription("Get your juicetokens up man!")
		.addSubcommand(subcommand =>
			subcommand.setName("rob")
				.setDescription("Rob somebody.")
                .addUserOption(option => 
					option.setName("target")
						.setDescription("The user to rob.")
						.setRequired(true)
					)
		).addSubcommand(subcommand =>
			subcommand.setName("slots")
				.setDescription("Put cash on the slots.")
		).addSubcommand(subcommand => 
            subcommand.setName("work")    
                .setDescription("Do some work in return for tokens.")
        ).addSubcommand(subcommand => 
            subcommand.setName("steal")    
                .setDescription("Go steal from somewhere.")
        )
        .addSubcommand(subcommand => 
            subcommand.setName("robstore")    
                .setDescription("Go rob somewhere.")
        )
        .addSubcommand(subcommand => 
            subcommand.setName("hoe")    
                .setDescription("Begin the hoeing.")
        ),
				
	async execute(interaction) {

		const caller = interaction.user.id;

		if (interaction.options.getSubcommand() === "rob") {
			await interaction.reply(`${interaction.user.username} just hit the ${flavor} juul.`);

			// does user have juul (interaction.user.id)

			//yes: hit


			// no: say you dont have juul

		} else if (interaction.options.getSubcommand() === "slots") {
			// does user have juul (interaction.user.id)

			//yes: pass to other user


			// no: say you dont have juul
		} else if (interaction.options.getSubcommand() === "work") {
			const newflavor = interaction.options.getString("flavor");
			flavor = newflavor;
			await interaction.reply(`${interaction.user.username} put a ${newflavor} pod into the juul.`);
			// does user have juul (interaction.user.id)

			//yes:


			// no:
		} else if (interaction.options.getSubcommand() === "steal") {
			// does user have juul (interaction.user.id)

			// yes: you already have it 

			// no : steal juul
		} else if (interaction.options.getSubcommand() === "robstore") {
			// does user have juul (interaction.user.id)

			// yes: you already have it 

			// no : steal juul
		} else if (interaction.options.getSubcommand() === "hoe") {
			// does user have juul (interaction.user.id)

			// yes: you already have it 

			// no : steal juul
		}

		
	},
};