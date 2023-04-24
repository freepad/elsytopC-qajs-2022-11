import "core-js/stable";
import "regenerator-runtime/runtime";
import fetch from "node-fetch";

describe('Working condition of API for Bookstore service', function () {

    it('Authorization error, login name is already in use', async function () {

        const body = {
            "userName": "Petya",
            "password": "dhfhvhfurfhYUIUYTTU4656573745_%$£678fghgtyrt",
        }

        const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        expect(data).toEqual({"code": "1204", "message": "User exists!"})
    });

    it('Creating user failure, password is invalid', async function () {
         const body = {
             "userName": "Odyssey",
             "password": "123"
         }

         const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(body)
         })

        const data = await response.json()
        expect(data).toEqual({"code": "1300", "message": "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."})
    });

    it('Creating user was successful', async function () {
         const body = {
             "userName": "Loophero",
             "password": "rhghfgjuehYTBVVCFHYB35563783_$?@!"
         }

         const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(body)
         })

        const data = await response.json()
        expect(data).toBeTruthy()
    });

    it('User auth failed, token is null', async function () {
        const body = {
            "userName": "Hercules",
            "password": "rhghfgjuehYTBVVCFHYB35563783_$?@_+"
        }

        const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        expect(data).toEqual({
            "token": null,
            "expires": null,
            "status": "Failed",
            "result": "User authorization failed."
        })
    });

    it('User authorized successfully, token has been created', async function () {
        const body = {
            "userName": "Mikkimouse",
            "password": "123TYUghp&*^"
        }

        const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        expect(data).toBeTruthy()
    });
})