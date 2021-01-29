const TeamSpeak3 = require("ts3-nodejs-library");
const config = getTS3Config(process.env)
const ts3 = new TeamSpeak3(config);

ts3.on("ready", () => {
    //Retrieves a List of non Query Clients
    ts3.clientList({client_type: 0}).then(clients => {
        tsclients = clients;
    }).catch(e => console.log("CATCHED", e.message));
});

function getTS3Config(env) {
    return {
        host: env.HOST,
        queryport: env.QUERYPORT,
        serverport: env.SERVERPORT,
        username: env.QUERY_USERNAME,
        password: env.QUERY_PASSWORD,
        nickname: env.NICKNAME
    }
}

async function realGetClientsALL() {
    var array = [];
    await ts3.clientList({client_type: 0}).then(clients => {

        clients.forEach(client => {
            array.push({
                nickname: client.getCache().client_nickname,
                uid: client.getUID(),
                dbid: client.getDBID()
            });
        });

    }).catch(e => console.log("CATCHED", e.message));

    return array;
}

async function getChannelList() {

    return ts3.channelList();

}

function getClients() {
    return ts3.clientList({client_type: 0});
}

function getServerInfo() {

    return ts3.serverInfo();

}

function serverMsg() {

    return ts3.serverInfo();

}

function getUserID(client) {
    console.log(client.getUID());
    return client.getUID();

}


ts3.on("error", e => console.log("Error", e.message));
ts3.on("close", e => console.log("Connection has been closed!", e));

module.exports = {
    ts3Client: ts3,
    realGetClientsALL,
    getClients,
    getUserID,
    serverMsg,
    getChannelList,
    getServerInfo
};