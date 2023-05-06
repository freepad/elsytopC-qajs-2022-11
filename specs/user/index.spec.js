import user from '../controller/user'
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from "../config.js";
import { faker } from '@faker-js/faker'
import axios from "axios";

describe('Working condition of user', () => {
    describe('POST /Account/v1/GenerateToken', () => {
        it('Generates token with correct username and password', async function () {
            const input = config.credentials;

            const res = await user.authorize(input)

            expect(res.status).toEqual(200)
            expect(typeof res.body.token).toEqual('string')
        });

        it('Returns status code 200 if user authorization failed', async function () {
            const res = await user.authorize({userName: 'B', password: "TYUYfgfghr46564*&^"})

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                "token": null,
                "expires": null,
                "status": "Failed",
                "result": "User authorization failed.",
            })
        })

        it('Returns status code 400 if userName and password required', async function () {
            const res = await user.authorize({userName: '', password: ""})

            expect(res.status).toEqual(400)
            expect(res.body).toEqual({
                "code": "1200",
                "message": "UserName and Password required.",
            })
        });

        it('Returns boolean value if user is authorized', async function () {
           const input = config.credentials;
           const res = await user.authorized(input)

            expect(res.status).toEqual(200)
            expect(res).toBeTruthy()
        });

        describe('GET /Account/v1/User/{UUID}', () => {
            it('Returns information about the user', async function () {
                const userName = faker.internet.userName()
                const password = 'YUIfhgt567*&^'

                const createUser = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
                    "userName": userName,
                    "password": password
                })

                const userId = createUser.data.userID

                const generateUserToken = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
                    "userName": userName,
                    "password": password
                })

                const token = generateUserToken.data.token

                const getUserInformation = await axios.get('https://bookstore.demoqa.com/Account/v1/User/' + userId, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                })

                expect(getUserInformation.status).toEqual(200)
            });
        })

        describe('DELETE /Account/v1/User/{UUID}', () => {
            it('Deletes the user', async function () {
                const userName = faker.internet.userName()
                const password = 'YUIfhgt567*&^'

                const createUser = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
                    "userName": userName,
                    "password": password
                })

                const userId = createUser.data.userID

                const generateUserToken = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
                    "userName": userName,
                    "password": password
                })

                const token = generateUserToken.data.token

                const deleteUser = await axios.delete('https://bookstore.demoqa.com/Account/v1/User/' + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })

                expect(deleteUser.status).toEqual(204)
            });
        })
    })
})