var express = require('express')
const PORT = process.env.PORT || 8080 || 5000 || 3000
var app = express()
app.enable('trust proxy')
app.set("json spaces",2)
app.use(express.static("public"))
app.listen(PORT, () => {
	console.log("Server berjalan dengan port: " + PORT)
})

app.get('/', (req, res) => {
	res.json('.')
})
const {
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   MimetypeMap,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   relayWAMessage,
   prepareMessageFromContent,
   GroupSettingChange,
   ChatModification,
   waChatKey,
   mentionedJid,
   WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys")
const wa = require('./connect')
const client = wa.client
const fetch = require('node-fetch')
wa.connect()
masukanpesan = []

client.on('chat-update', async (mek) => {
try {
	if (!mek.hasNewMessage) return
    mek = mek.messages.all()[0]
    if (!mek.message) return
	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
	if (!mek.message) return
	fetch(`https://api.countapi.xyz/hit/${client.user.jid.split('@')[0]}/traficmsg`, {method:'get'})
	if (!mek.key.id.startsWith('3EB0') && !mek.key.id.length === 12) return
	if (mek.key && mek.key.remoteJid == 'status@broadcast') return
	if (mek.key.remoteJid.endsWith('@g.us')) return
	const from = mek.key.remoteJid
	const type = Object.keys(mek.message)[0]
	body = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'listResponseMessage') && mek.message.listResponseMessage.selectedDisplayText ? mek.message.listResponseMessage.selectedDisplayText : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedDisplayText ? mek.message.buttonsResponseMessage.selectedDisplayText : ''
	budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'listResponseMessage') && mek.message.listResponseMessage.selectedDisplayText ? mek.message.listResponseMessage.selectedDisplayText : ''
	respontmbl = (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedDisplayText ? mek.message.buttonsResponseMessage.selectedDisplayText : ''
	quotedbtntext = (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.contextInfo.quotedMessage.buttonsMessage.contentText ? mek.message.buttonsResponseMessage.contextInfo.quotedMessage.buttonsMessage.contentText : ''
	const command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
	const args = body.trim().split(/ +/).slice(1)
	const isGroup = mek.key.remoteJid.endsWith('@g.us')
	const sender = mek.key.fromMe ? client.user.jid : isGroup ? mek.participant : mek.key.remoteJid
	pushname = mek.key.fromMe ? client.user.name : client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : 'kak'
	const reply = async (teks) => {
		await client.updatePresence(from, Presence.composing)
		return await client.sendMessage(from, teks, MessageType.text, {quoted:mek})
	}
	const sendlist = async (tekss = '.', tekstombol, baris, title = '') => {
		if (!tekstombol) {tekstombol = 'klik disini'}
		if (!baris) {baris = [{"title": "kok bisa","rowId": `hmm`}]}
		let po = client.prepareMessageFromContent(from, {
		"listMessage":{
			"title": title,
	    	"description": tekss,
			"buttonText": tekstombol,
			"listType": "SINGLE_SELECT",
			"sections": [
				{
					"title": "Silahkan pilih salah satu",
					"rows": baris
				}]}}, {}) 
			client.relayWAMessage(po, {waitForAck: true})
		}
	async function copyNForward(jid, message, forceForward = false, options = {}) {
      let mtype = Object.keys(message.message)[0]
      let content = await client.generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != MessageType.text) context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
         ...context,
         ...content[ctype].contextInfo
      }
      const waMessage = await client.prepareMessageFromContent(jid, content, options)
      await client.relayWAMessage(waMessage)
      return waMessage
    }
console.log(JSON.stringify(mek, null, 2)+'\n=====================================\n')
switch (command) {
	case '>':
		try {
        reply(require('util').format(await eval(`;(async () => { ${args.join(' ')} })()`)))
        } catch (e) {
        monosp = '```'
        reply(`${monosp}${e}${monosp}`)
        }
    break 
    case 'offline':
    	client.updatePresence(from, Presence.unavailable)
    break
    case 'online':
    	client.updatePresence(from, Presence.available)
    break
    default:
if (masukanpesan.includes(sender)) {
	masukanpesan.splice(sender, 1)
	pisahkanpesan = await copyNForward(client.user.jid, mek)
	await client.sendMessage(client.user.jid, `dari ${pushname} wa.me/${sender.split('@')[0]}`, MessageType.text, {quoted:pisahkanpesan})
	await reply(`Pesan ini akan dipisahkan`)
}

if (command === 'p' || command === 'rif' || command === 'zan' || command === 'rip') {
	const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'Memberi info'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Minta tolong'}, type: 1},
  {buttonId: 'id3', buttonText: {displayText: 'Bahas keperluan lain'}, type: 1},
]

const buttonMessage = {
    contentText: `( _pesan otomatis_ )\nHalo ~${pushname}\nMohon maaf, ada yang bisa kami bantu`,
    footerText: 'Saya ingin ⬇️',
    buttons: buttons,
    headerType: 1
}

const sendMsg = await client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)
}

if (respontmbl === 'Bahas keperluan lain') {
	const buttons = [
		{buttonId: 'id1', buttonText: {displayText: 'oke'}, type: 1},
		{buttonId: 'id2', buttonText: {displayText: 'tidak jadi'}, type: 1},
		]
	const buttonMessage = {
	    contentText: `( _pesan otomatis_ )\n Apa anda benar ingin membahas hal lain ?`,
	    footerText: 'lanjutkan',
	    buttons: buttons,
	    headerType: 1
	}
	client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)
}

if (quotedbtntext === `( _pesan otomatis_ )\n Apa anda benar ingin membahas hal lain ?`) {
	if (respontmbl === 'oke') {
		masukanpesan.push(sender)
		reply('( _pesan otomatis_ )\nSilahkan kirim pesan penting anda kepada kami')
	} else if (respontmbl === 'tidak jadi') {
		reply(`Terimakasih telah menghubungi kami, kami berharap anda tidak spam _( kirim pesan berkali kali bersifat mengganggu )_`)
	}
}

if (respontmbl === 'Memberi info') {
	const buttons = [
	  {buttonId: 'id1', buttonText: {displayText: 'Hal di sekolah'}, type: 1},
	  {buttonId: 'id2', buttonText: {displayText: 'Hal di rumah'}, type: 1},
	  {buttonId: 'id3', buttonText: {displayText: 'Lainnya'}, type: 1},
		]
	const buttonMessage = {
	    contentText: `( _pesan otomatis_ )\nAnda ingin memberi info tentang apa`,
	    footerText: 'Saya ingin memberi info tentang ⬇️',
	    buttons: buttons,
	    headerType: 1
	}
	client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)
}

if (respontmbl === 'Lainnya' || respontmbl === 'Hal di sekolah' || respontmbl === 'Hal di rumah') {
	const buttons = [
	  {buttonId: 'id1', buttonText: {displayText: 'Ya'}, type: 1},
	  {buttonId: 'id2', buttonText: {displayText: 'Tidak'}, type: 1}
		]
	const buttonMessage = {
	    contentText: `( _pesan otomatis_ )\nSilahkan masukkan pesan anda`,
	    footerText: 'anda yakin ?',
	    buttons: buttons,
	    headerType: 1
	}
	client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)
}

if (quotedbtntext === '( _pesan otomatis_ )\nSilahkan masukkan pesan anda') {
	if (respontmbl === 'Ya') {
		masukanpesan.push(sender)
		reply('( _pesan otomatis_ )\nSilahkan kirim pesan penting anda')
	} else if (respontmbl === 'Tidak') {
		reply(`Terimakasih telah menghubungi kami, kami berharap anda tidak spam _( kirim pesan berkali kali bersifat mengganggu )_`)
	}
}

if (respontmbl === 'Minta tolong') {
	const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'Hal di sekolah'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Hal di rumah'}, type: 1},
  {buttonId: 'id3', buttonText: {displayText: 'Lainnya'}, type: 1},
]
const buttonMessage = {
    contentText: `( _pesan otomatis_ )\nAnda ingin minta tolong tentang apa`,
    footerText: 'Saya ingin minta tolong tentang ⬇️',
    buttons: buttons,
    headerType: 1
}
client.sendMessage(from, buttonMessage, MessageType.buttonsMessage)
}


}

} catch (e) {
	console.log(e)
}
})
