import supertest from "supertest";
import config from '../config/bookstore.js'

const { url } = config;

export default {
    createFakeUser: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },
    getUserToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },
    async getAuthToken(payload) {

        const res = await this.getUserToken(payload)

        return res.body.token
    }   
}
