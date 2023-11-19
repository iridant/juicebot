const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nuke')
		.setDescription('Clears a text channel\'s history.')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The target channel to clear.')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
        var targetChannel = interaction.options.getChannel("channel");

        if(targetChannel){
            console.log(targetChannel);
        }else{
            targetChannel = interaction.channel
        }

        const cloneChannel = await interaction.channel.clone();
        await cloneChannel.setPosition(interaction.channel.position);
        await interaction.channel.delete()

		await cloneChannel.send(`This channel has been nuked by ${interaction.user}.`);
	},
};