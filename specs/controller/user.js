import supertest from 'supertest'
import config from '../config.js'

const { url } = config

let token = '';

const user = {
    authorize: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },

    authorized: (payload) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .send(payload)
    },

    async getAuthToken() {
        const payload = config.credentials

        const res = await this.authorize(payload)

        return res.body.token
    },

    async getAuthTokenWithCache() {
        if (token)
            return token

        token = await this.getAuthToken()

        return token
    },

    user: (token) => {
        return supertest(url)
            .get('/Account/v1/User/')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send()
    }
}

export default user;