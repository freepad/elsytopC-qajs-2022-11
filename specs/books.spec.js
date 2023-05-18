import supertest from "supertest";
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from '../framework/config/bookstore.js'
import { generateUser } from "../framework/fixtures/user.js";

const { url } = config

describe('Working condition of books API for user', () => {

    let user;
    beforeEach(() => {
        user = generateUser()
    })

    it('Creating a book for the user', async function () {

        const response = await supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(user)

        const userToken = await supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(user)

        const addBook = await supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${userToken.body.token}`)
            .send({
                "userId": response.body.userID,
                "collectionOfIsbns": [
                    {
                        "isbn": "9781449325862"
                    }
                ]
            })

        expect(addBook.status).toBe(201)
        expect(addBook.body).toEqual({
            "books": [
                {
                    "isbn": "9781449325862"
                }
            ]
        })
    })

    it('Updating book for the user', async function () {

        const response = await supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(user)

        const userToken = await supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(user)

        const addBook = await supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${userToken.body.token}`)
            .send({
                "userId": response.body.userID,
                "collectionOfIsbns": [
                    {
                        "isbn": "9781449325862"
                    }
                ]
            })

        const updateBook = await supertest(url)
            .put('/BookStore/v1/Books/' + '9781449325862')
            .set('Authorization', `Bearer ${userToken.body.token}`)
            .send({
                "userId": response.body.userID,
                "isbn": "9781491950296"
            })

        expect(updateBook.status).toBe(200)
    })

    it('Deleting book for the user', async function () {

        const response = await supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(user)

        const userToken = await supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(user)

        const addBook = await supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${userToken.body.token}`)
            .send({
                "userId": response.body.userID,
                "collectionOfIsbns": [
                    {
                        "isbn": "9781449325862"
                    }
                ]
            })

        const deleteBook = await supertest(url)
            .delete('/BookStore/v1/Book')
            .set('Authorization', `Bearer ${userToken.body.token}`)
            .send({
                "isbn": "9781449325862",
                "userId": response.body.userID
            })

        expect(deleteBook.status).toBe(204)
    });
})

describe('Getting information about a book', () => {
    it('GET /BookStore/v1/Book', async function () {
        let getBookInfo = await supertest(url)
            .get('/BookStore/v1/Book?ISBN=9781491904244')
            .set('Accept', 'application/json')
            .send()

        expect(getBookInfo.status).toBe(200)
    });
})
