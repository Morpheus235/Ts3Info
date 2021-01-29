const Promise = require('bluebird');
const ts3 = require('./script');

async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve();
        }, ms);
    });
}

module.exports = (router) => {
    router.get("/", async (ctx) => {
        gg = await ts3.realGetClientsALL();
        cL = (await ts3.getChannelList()).map((channel) => {
            return channel.getCache()
        });
        await ctx.render('pages/index', {
            tsUser: gg,
            tsChannel: cL,

        });
    });

    router.get("/ts/clients", async (ctx) => {
        ctx.body = (await ts3.getClients()).map((client) => {
            return client.getCache().client_nickname
        });
        // console.log(ctx.body);
    });

    router.get("/ts/channelliste", async (ctx) => {
        ctx.body = (await ts3.getChannelList()).map((channel) => {
            return channel.getCache()
        });
        //  console.log(ctx.body);

    });
    router.get("/ts/serverinfo", async (ctx) => {
        let severinfo = await ts3.getServerInfo();
        ctx.body = severinfo;

        //console.log(JSON.stringify(severinfo, null, 4));

    });

    router.get("/ts/serverinfo/basic", async (ctx) => {
        let basicinfo = await ts3.getBasicInfo();
        ctx.body = basicinfo;

        console.log(JSON.stringify(basicinfo, null, 4));

    });


    router.post("/ts/poke", (ctx) => {
        let anzahl = ctx.request.body.anzahl || 5;
        let delay = ctx.request.body.delay || 500;
        let nick = ctx.request.body.nick || 'Daniel';
        let nachricht = ctx.request.body.nachricht || "Moin";
        return Promise.map(ts3.getClients(), async (client) => {
            if (client.getCache().client_nickname.toLowerCase() === nick.toLowerCase()) {
                for (let i = 1; i <= anzahl; i++) {
                    await wait(delay);
                    await client.poke(nachricht);
                }
                ctx.body = "SUCCESS";
                console.log(client.getCache().client_nickname)
            }
        });
    });

    router.post("/ts/move", async (ctx) => {
        let nick = ctx.request.body.nick || "Daniel";
        let channel = ctx.request.body.channel || 639;

        return Promise.map(ts3.getClients(), async (client) => {
            if (client.getCache().client_nickname.toLowerCase() === nick.toLowerCase()) {

                client.move(channel);
            }
            ctx.body = channel;
        });
    });


    router.post("/ts/msg", (ctx) => {
        let anzahl = ctx.request.body.anzahl || 5;
        let delay = ctx.request.body.delay || 500;
        let nick = ctx.request.body.nick || 'Daniel';
        let nachricht = ctx.request.body.nachricht || "Moin";
        return Promise.map(ts3.getClients(), async (client) => {
            if (client.getCache().client_nickname.toLowerCase() === nick.toLowerCase()) {
                for (let i = 1; i <= anzahl; i++) {
                    await wait(delay);
                    client.message(nachricht);
                }
                ctx.body = "SUCCESS";
                console.log(client.getCache().client_nickname)
            }
        });
    });

    router.post("/ts/channelMsg", (ctx) => {
        let anzahl = ctx.request.body.anzahl || 5;
        let delay = ctx.request.body.delay || 500;
        let nick = ctx.request.body.nick || 'Daniel';
        let nachricht = ctx.request.body.nachricht || "Moin";
        let Ziel = ctx.request.body.Ziel;
        let Modus = ctx.request.body.Modus || '1';

        ts3.sendTextMessage(nick, Modus, nachricht);

        ctx.body = "SUCCESS";
        console.log("'nachricht' ging an 'nick'")
    });


    router.post("/ts/kick", async (ctx) => {
        let nick = ctx.request.body.nick || 'Dani';
        let nachricht = ctx.request.body.nachricht || "Moin";
        return Promise.map(ts3.getClients(), (client) => {
            if (client.getCache().client_nickname.toLowerCase() === nick.toLowerCase()) {
                client.kickFromServer(nachricht);


            }
            console.log("Kicked " + client);
        });
    });

    router.post("/ts/ban", async (ctx) => {
        let nick = ctx.request.body.nick || undefined;
        let uid = ctx.request.body.uid || undefined;
        let nachricht = ctx.request.body.nachricht || "Moin";
        let dauer = ctx.request.body.dauer || 30;
        let ip = ctx.request.body.ip || undefined;
        await ts3.ts3Client.banAdd(ip, nick, uid, dauer, nachricht)
            .then((res) => {
                console.log("Banned: " + nick)
            })
            .catch(err => {
                console.warn(err)
            })
    });


    router.post("/ts/getid", async (ctx, next) => {
        let nick = ctx.request.body.nick || 'Dani';
        return Promise.map(ts3.getClients(), (client) => {
            if (client.getCache().client_nickname.toLowerCase() === nick.toLowerCase()) {
                //teamSpeakClient.getID() ⇒ number
                console.log(client.getUID())
                ctx.body = "";
            }


        });
    });


    router.post("/ts/poke/random", async (ctx, next) => {
        let anzahl = ctx.request.body.anzahl || 5;
        let delay = ctx.request.body.delay || 500;
        let nachricht = ctx.request.body.nachricht || "Moin";
        let clients = await ts3.getClients();
        let client = clients[Math.floor(Math.random() * (clients.length))];
        console.log(client.getCache().client_nickname);

        for (let i = 1; i <= anzahl; i++) {
            await wait(delay);
            client.poke(nachricht);
        }

        ctx.body = "SUCCESS";
    });

    router.post("/ts/kick/random", async (ctx, next) => {
        let nachricht = ctx.request.body.nachricht || "tschüss";
        let clients = await ts3.getClients();
        let client = clients[Math.floor(Math.random() * (clients.length))];
        console.log(client.getCache().client_nickname);

        client.kickFromServer(nachricht);
        ctx.body = "SUCCESS";
    });

    router.post("/ts/msg/random", async (ctx, next) => {
        let anzahl = ctx.request.body.anzahl || 5;
        let delay = ctx.request.body.delay || 500;
        let nachricht = ctx.request.body.nachricht || "Moin";
        let clients = await ts3.getClients();
        let client = clients[Math.floor(Math.random() * (clients.length))];
        console.log(client.getCache().client_nickname);

        for (let i = 1; i <= anzahl; i++) {
            await wait(delay);
            client.message(nachricht);
        }
        ctx.body = "SUCCESS";
    });
}
