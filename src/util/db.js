const { Sequelize, DataTypes } = require('sequelize');
const path = require("path");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dbs'
});

const ServerData = sequelize.define('ServerData', {
    guildId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_joined: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    last_left: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    defaultRole: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    verifyRole: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});

const RoleData = sequelize.define("RoleData", {
    memid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

const JuulData = sequelize.define("JuulData", {
    memid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    has_juul: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const EconomyData = sequelize.define("EconomyData", {
    memid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tokens: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
})

const UserData = sequelize.define('UserData', {
    memid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    last_left: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    times_left: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    times_returned: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    account_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "GOOD"
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

const Settings = sequelize.define('Settings', {
    setting: DataTypes.STRING,
    value: DataTypes.STRING
});

//GetMemberTag (Gets the tag of the member, consisting of unique identifying characteristics)
function getMemberTag(member){
    return `[${member.id}:${member.user.username}@${member.guild.id}:${member.guild.name}]`;
}

//GetMemberTag (Gets the tag of the member, consisting of unique identifying characteristics)

function getServerID(server){
    return `[${guild.id}]`
}

async function createUser(member){
    const newUser = await UserData.create({memid: getMemberTag(member)});

    await RoleData.create({memid: getMemberTag(member), roles: JSON.stringify(member._roles)});
    await JuulData.create({memid: getMemberTag(member)});
    await EconomyData.create({memid: getMemberTag(member)});

    console.log(`A new user has been created for the database.\n\n${newUser}`);

    return newUser;
}
async function createGuild(guild){
    const newGuild = await ServerData.create({guildId: guild.id});

    return newGuild;
}

async function loadMemberData(member){
    const mdata = {
        user: await await UserData.findOne({where: {memid: getMemberTag(member)}}),
        roles: await RoleData.findOne({where: {memid: getMemberTag(member)}}),
        economy: await EconomyData.findOne({where: {memid: getMemberTag(member)}}),
        juuldata: await JuulData.findOne({where: {memid: getMemberTag(member)}}),
    }

    return mdata
}

async function setRoles(member){
    const user = await RoleData.findOne({where: {memid: getMemberTag(member)}});

    user.update({roles: JSON.stringify(member._roles)})
}

sequelize.sync()

/*
Settings.create({
  setting: "juul_hits",
  value: "0"
})*/

module.exports = {
    sequelize,

    createUser,
    createGuild,
    setRoles,
    getMemberTag,
    loadMemberData,

    UserData,
    RoleData,
    EconomyData,
    Settings,
    ServerData
}
