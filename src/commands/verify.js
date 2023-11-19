const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const db = require("../util/db.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify a user.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to verify')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // MAKE "MANAGERS ABLE TO DO THIS"

	async execute(interaction) {
        const userTarget = interaction.options.getMember("target");
        const guildData = await db.ServerData.findOne({where: {"guildId": interaction.member.guild.id}});
        const memberData = await db.RoleData.findOne({where: {"memid": db.getMemberTag(userTarget)}})

        if(guildData && guildData.dataValues.verifyRole && guildData.dataValues.defaultRole){
            await userTarget.roles.add(guildData.dataValues.verifyRole);
            await userTarget.roles.remove(guildData.dataValues.defaultRole);
            await memberData.update({"verified": true})
            await interaction.reply(`${interaction.options.getUser("target")} has been verified by ${interaction.member.user}`);
        }else{
            await interaction.reply('There is no verified or default role set-up for this server! Set one up with /setupguild!');
        }
	},
};