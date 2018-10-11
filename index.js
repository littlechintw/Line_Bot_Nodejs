//This is a Node.js Line Bot Code
const linebot = require('linebot');
const express = require('express');

const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();

app.get('/',function(req,res){
    res.send('Hello World!\nHah~');
});

app.post('/linewebhook', linebotParser);

bot.on('message', function (event) {
	var gtype = event.message.type;
	var gm = event.message.text; //收到的訊息
	var rm; //欲回復訊息
	var gmtype = event.source.type; //訊息接收來自room or group
	var guserid = event.source.userId;
	var ggroupid = event.source.groupId;
	var groomid = event.source.roomId;

	if(gtype == 'text'){
		if(gm.toLowerCase() == '/help' || gm.toLowerCase() == 'help' || gm == '幫助'){
			rm = '這是一個句點bot。\n運勢:/lucky\n查看詳細資訊:/detail\n將我退出群組:/bye\n查詢南一中班級課表:/tnfshcf(班級) (ex:/tnfshcf101)';
		}
		else if(gm.toLowerCase() == '/detail' || gm.toLowerCase() == 'detail' || gm == '資訊'){
			rm = 'Author:littlechin\nVersion:1.0.4\nFunction:句點別人，還有一些小功能';
		}
		else if(gm.toLowerCase() == '/lucky' || gm.toLowerCase() == 'lucky' || gm == '運勢' || gm == '抽運勢'){
			var luckynum = Math.floor(Math.random() * 31);
			if(luckynum <= 2){
				rm = '大凶';}
	    else if(luckynum <= 7){
	      rm = '中凶';}
	    else if(luckynum <= 14){
	      rm = '小凶';}
	    else if(luckynum <= 22){
	      rm = '小吉';}
	    else if(luckynum <= 28){
	      rm = '中吉';}
	    else if(luckynum <= 30){
	      rm = '大吉';}
		}
		else if(gm == '/bye'){
			if(ggroupid == 'C990ab05a65661d14bc336f1a530f2797'){
				rm = '機器人不能離開此群組!!';
			}
			else if(gmtype == 'group'){
				bot.leaveGroup(ggroupid);
			}
			else if(gmtype == 'room'){
				bot.leaveGroup(groomid);
			}
			else{
				rm = 'error!!\n機器人無法離開';
			}
		}
		else if(gm == '/userId'){
			rm = guserid;
		}
		else if(gm == '/groupId'){
			if(gmtype == 'group'){
				rm = ggroupid;
			}
			else{
				rm = 'error!!\n無法得知groupId';
			}
		}
		else if(gm == '/roomId'){
			if(gmtype == 'room'){
				rm = roomIdid;
			}
			else{
				rm = 'error!!\n無法得知roomId';
			}
		}
		else if(gm.substr(0,8).toLowerCase() == '/tnfshcf'){
			var gmclass = Number(gm.substr(8,3));
			if((gmclass >= 101 && gmclass <= 119) || (gmclass >= 201 && gmclass <= 219) || (gmclass >= 301 && gmclass <= 319)){
				rm = 'http://w3.tnfsh.tn.edu.tw/deanofstudies/course/C101' + String(gmclass) + '.html';
			}
			else{
				rm = 'error!!\n範圍錯誤';
			}
		}
		else if(ggroupid == 'Cc1b85aa8d2f894a2129393b79f0260a2'){
			if(gm.indexOf("帥") > -1){
				rm = '甚麼?剛剛484提到帥！對！！小群很帥！！！超帥><'
			}
		}
		else{
			if(gmtype =='user'){
				rm = 'ㄛ';
			}
		}
	}
	else {
		if(gmtype =='user'){
			rm = '看不懂啦！';
		}
	}



  var log = 'userID:' + guserid + '\n\nSourceType:' + gmtype + '\n\ngroupID:' + ggroupid  + '\n\nroomID:' +  groomid + '\n\nget messagetype:' + gtype + '\n\nget message:' + gm + '\n\nreply message:' + rm;

	event.reply(rm).then(function (data) {
		console.log('Success\n' + log + "\n", data);
	}).catch(function (error) {
		console.log('Error\n' + log + "\n", error);
	});
	bot.push('C990ab05a65661d14bc336f1a530f2797',log);
});

app.listen(process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});
