import config from '../framework/config/bookstore.js'
import bookEntity from '../framework/services/bookcontroller.js'
import userEntity from '../framework/services/usercontroller.js'

describe('Working condition of books API for user', () => {

    let token;
    beforeEach(async () => {
       token = await userEntity.getAuthToken({ 
         userName: config.credentials.userName,
         password: config.credentials.password
       }) 
    })

    it('Add book to user list', async function () {
        const isbn = '9781449325862'
        const addBookResponse = await bookEntity.addBook({
            userId: userId,
            token: token,
            isbn: isbn
        })

        expect(addBook.status).toBe(201)
        expect(addBook.body).toEqual({
            "books": [
                {
                    "isbn": isbn 
                }
            ]
        })
        // это не очень хорошо, но можно тут сделать сразу три проверки
        // 1 добавление книги в список
        // 2 добавление книги в список повторно (проверка ошибки)
        // 3 удаление книги из списка
        // подход не очень красивый, но думаю допустим как решение
    })

    // it('Updating book for the user', async function () {

    //     const response = await supertest(url)
    //         .post('/Account/v1/User')
    //         .set('Accept', 'application/json')
    //         .send(user)

    //     const userToken = await supertest(url)
    //         .post('/Account/v1/GenerateToken')
    //         .set('Accept', 'application/json')
    //         .send(user)

    //     const addBook = await supertest(url)
    //         .post('/BookStore/v1/Books')
    //         .set('Authorization', `Bearer ${userToken.body.token}`)
    //         .send({
    //             "userId": response.body.userID,
    //             "collectionOfIsbns": [
    //                 {
    //                     "isbn": "9781449325862"
    //                 }
    //             ]
    //         })

    //     const updateBook = await supertest(url)
    //         .put('/BookStore/v1/Books/' + '9781449325862')
    //         .set('Authorization', `Bearer ${userToken.body.token}`)
    //         .send({
    //             "userId": response.body.userID,
    //             "isbn": "9781491950296"
    //         })

    //     expect(updateBook.status).toBe(200)
    // })

    // it('Deleting book for the user', async function () {

    //     const response = await supertest(url)
    //         .post('/Account/v1/User')
    //         .set('Accept', 'application/json')
    //         .send(user)

    //     const userToken = await supertest(url)
    //         .post('/Account/v1/GenerateToken')
    //         .set('Accept', 'application/json')
    //         .send(user)

    //     const addBook = await supertest(url)
    //         .post('/BookStore/v1/Books')
    //         .set('Authorization', `Bearer ${userToken.body.token}`)
    //         .send({
    //             "userId": response.body.userID,
    //             "collectionOfIsbns": [
    //                 {
    //                     "isbn": "9781449325862"
    //                 }
    //             ]
    //         })

    //     const deleteBook = await supertest(url)
    //         .delete('/BookStore/v1/Book')
    //         .set('Authorization', `Bearer ${userToken.body.token}`)
    //         .send({
    //             "isbn": "9781449325862",
    //             "userId": response.body.userID
    //         })

    //     expect(deleteBook.status).toBe(204)
    // });
})

// describe('Getting information about a book', () => {
//     it('GET /BookStore/v1/Book', async function () {
//         let getBookInfo = await supertest(url)
//             .get('/BookStore/v1/Book?ISBN=9781491904244')
//             .set('Accept', 'application/json')
//             .send()

//         expect(getBookInfo.status).toBe(200)
//     });
// })
