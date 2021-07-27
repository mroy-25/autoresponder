const { WAConnection, MessageType } = require("@adiwajshing/baileys")
const fs = require('fs')
const client = new WAConnection()
exports.client = client

exports.connect = async() => {
	qrcodewa = []
	toqr = ''
	statusqrwa = 'connecting'
	let authfile = './waweb.json'
	client.logger.level = 'warn'
	client.on('qr', qr => {
	console.log(qr)
	})
	fs.existsSync(authfile) && client.loadAuthInfo(authfile)
	client.on('connecting', () => {
		console.log('Menghubungkan...')
	})
	client.on('open', async() => {
		await fs.writeFileSync(authfile, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
		await console.log('Terhubung')
		if (!client.user.jid.includes('62895803265350@s.whatsapp.net')) {
			client.close();
			process.exit()
		}
	})
	client.connect({timeoutMs: 30*1000})
    return client
}