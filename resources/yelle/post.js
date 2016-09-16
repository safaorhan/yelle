cancelUnless(body && body.token && body.token == "SLACK_TOKEN_HERE", "You are not authorized with a valid token", 401);

var cmd = {};

cmd.teamId = body.team_id;
cmd.teamDomain = body.team_domain;
cmd.channelId = body.channel_id;
cmd.channelName = body.channel_name;
cmd.userId = body.user_id;
cmd.userName = body.user_name;
cmd.command = body.command;
cmd.text = body.text;
cmd.responseUrl = body.response_url;

if(cmd.text == "aç") {
    cmd.code = 100;
    cmd.param = 0;
} else if(cmd.text == "kapat") {
    cmd.code = 101;
    cmd.param = 0;
} else {
    var temp = parseInt(cmd.text);
    if(isNaN(temp) || temp < 18 || temp > 30) {
        setResult("*Bu komutu anlayamadım.* Geçerli komutlar:\n\n`/yelle aç`\n`/yelle kapat`\n`/yelle 24` (Sıcaklık 18-30 aralığında olabilir)");
        return;
    }
    
    cmd.code = 102;
    cmd.param = temp;
}

dpd.commands.post(cmd, function(result, error) {
    if(error) {
        cancel(error);
    } else {
        setResult("Yelledim! :)")
    }
});