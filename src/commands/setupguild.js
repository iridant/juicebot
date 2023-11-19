const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const db = require("../util/db.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setupguild')
		.setDescription('First time set up, populates the database for the specified guild..')
        .addRoleOption(option => 
            option.setName('default_role')
                .setDescription('Default role for server.')
                .setRequired(true)
        )
        .addRoleOption(option => 
            option.setName('verify_role')
                .setDescription('Verified role for server.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
        const guildData = await db.ServerData.findOne({where: {"guildId": interaction.member.guild.id}})
        const guildItem = guildData ? guildData : await db.ServerData.create({"guildId": interaction.member.guild.id});
        const defaultRole = interaction.options.getRole("default_role");
        const verifyRole = interaction.options.getRole("default_role");


        await guildItem.update({"verifyRole": verifyRole.id, "defaultRole": defaultRole.id})

        interaction.guild.members.cache.map(member => {
            member.roles.add(defaultRole.id);
            db.createUser(member);
        })

        await interaction.reply(`${interaction.user} has set up the guild settings.`)
	},
};