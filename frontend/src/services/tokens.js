import { config } from '../config'

export class TokensApi {
	
	constructor() {
		this.token = localStorage.getItem('token')
		this.apiAddr = `${config.serverAddress}:${config.serverPort}`
		
		this.checkToken().then(r=>{})
		this.user = null

		if (!this.token) {
			console.log("O chuj")
		}
	}

	checkToken() {
		return new Promise((resolve, reject) => {
			fetch(this.apiAddr + '/api/tokens/checkToken', {
				headers: {
					'Content-Type':'application/json',
					'x-access-token': this.token
				}
			}).then(resp => {
				if (resp.status == 401)
					return null
				else
					return resp.json()
			
			}).then(usr => {
				this.user = usr
				
				if (usr)
					resolve(usr)
				else
					reject(usr)
			})
		})
	}

	isAuthenticated() {
		return (!!this.user)
	}

	getUser() {
		return this.user
	}

	get(login, pass) {
		return new Promise((resolve, reject) => {
			fetch(this.apiAddr + '/api/tokens', {
				method: 'POST',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					"login": login,
					"pass": pass
				})
			}).then(resp => {
				console.log(resp)
				if (resp.status === 201) {
					const body = resp.json()
					this.token = body.token || null
					this.user = {
						login: body.login
					}
					localStorage.setItem('token', this.token)
					resolve(body)
				} else {
					reject("Jakis chuj strzelil")
				}
			})
		})
	}
}