import supertest from "supertest";
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from '../config/bookstore.js'

const { url } = config;

const userEntity = {
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
    },
    addBook: () => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${this.getUserToken.body.token}`)
            .send({
                "userId": this.createFakeUser.body.userID,
                "collectionOfIsbns": [
                    {
                        "isbn": "9781449325862"
                    }
                ]
            })
    },
    updateBook: () => {
        return supertest(url)
            .put('/BookStore/v1/Books/' + '9781449325862')
            .set('Authorization', `Bearer ${this.getUserToken.body.token}`)
            .send({
                "userId": this.createFakeUser.body.userID,
                "isbn": "9781491950296"
            })
    },
    deleteBook: () => {
        return supertest(url)
            .delete('/BookStore/v1/Book')
            .set('Authorization', `Bearer ${this.getUserToken.body.token}`)
            .send({
                "isbn": "9781449325862",
                "userId": this.createFakeUser.body.userID
            })
    }
}

export default userEntity;