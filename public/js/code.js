var kickmsg = "tschüss";

function getClients(){
    $.getJSON('/ts/clients', (data) => {
        return (data);
    });
}

function getChannel(){
    $.getJSON('/ts/channelliste', (channel) => {
        return (channel);
    });
}

function onloadFunc()
{
    getServerinfo();
}

function getServerinfo(){
    $.getJSON('/ts/serverinfo', (data) => {
        var test = data;
       document.getElementById("player_count").innerHTML = 'Clients:' + data.virtualserver_clientsonline + '|' + data.virtualserver_maxclients
        return (data);
       
    });
}

function pokeUser(){
    $.post("/ts/poke", {
        nick:       $("#userPoke").text(),
        delay:      $("#delayPoke").val(),
        nachricht:  $("#textPoke").val(),
        anzahl:     $("#anzahlPoke").val(),        
    }).done((data) => {
        console.log(data);
    });
}

function moveUser(){

    $.post("/ts/move", {
        nick:       $("#user_move_name").text(),
        channel: parseInt($("#channelMove").text()),
        
    }).done((data)=> {
        console.log(data);   
    });

}

function banUser(undefined, nick, uid, undefined, reason  ){

    if (!uid){
        nick =  $("#userKick").val();
        uid =  $("#userKick").val();
        reason =   $("#textKick").val();
    $.post("/ts/ban"), {
                
            nick:nick,
            nachricht:reason || "tschüss",
        }
}
}


function pokeUserRandom(){
    $.post("/ts/poke/random", {
        delay: $("#delayPoke").val(),
        nachricht: $("#textPoke").val(),
        anzahl: $("#anzahlPoke").val(),
    }).done((data) => {
        console.log(data);
    });

}

function sendMsgRandom(){
    $.post("/ts/msg/random", {
        nachricht: $("#textMsg").val(),
        anzahl: $("#anzahlMsg").val(),
    }).done((data) => {
        console.log(data);
    });

}

function sendMsg(){
    $.post("/ts/msg", {
        nick:       $("#userMsg").text(),
        delay:      $("#delayMsg").val(),
        nachricht:  $("#textMsg").val(),
        anzahl:     $("#anzahlMsg").val(),
    }).done((data) => {
        console.log(data);
    });

}

function sendMsgAll(){
    $.post("/ts/msg", {
        ziel:       $(/"#tbd"/).text(),
        //delay:      $("#delayMsg").val(),
        nachricht:  $(/"#textMsg"/).val(),
        //anzahl:     $("#anzahlMsg").val(),
        modus:      $(/"#tbd"/).val(),

    }).done((data) => {
        console.log(data);
    });

}

function kickUserRandom(){
    $.post("/ts/kick/random", {
        nachricht: $("#textKick").val(),
    }).done((data) => {
        console.log(data);
    });

}



function kickUser(nick, msg){
    if (!nick){
        nick =  $("#userKick").val();
        msg =   $("#textKick").val();
    $.post("/ts/kick"), {
                
            nick:nick,
            nachricht:msg || "tschüss",
        }
    }else{
        $.post("/ts/kick", {
                
            nick:nick,
            nachricht:msg || "tschüss",
            
        }).done((data) => {
            console.log(data);
            }); 
    }
}
function getClientId(nick){
    if (!nick){
        nick = $("#user").val();
    }
        $.post("/ts/getid", {

            nick:nick,

        }).done((data) => {
            console.log(data);
        });
}

    $(".dropdown_user").on('click', 'li a', function(){
      $(".dropdown-toggle.btn_user:first-child").text($(this).text());
      $(".dropdown-toggle.btn_user:first-child").val($(this).text());
   });
   
   $("#move_Dropdown").on('click', 'li a', function(){
    $("#channelMove").text($(this).text());
    $("#channelMove").val($(this).text());
 });
