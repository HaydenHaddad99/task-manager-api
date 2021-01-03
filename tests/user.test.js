const request = require('supertest')
const app = require('../src/app')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

const User = require('../src/models/user')


beforeEach(setupDatabase)


test('Should signup as a new user', async () => {
   const response = await request(app).post('/users').send({

        name: "Saari Haddad",
        email: "max_m391@yahoo.com",
        password: "hhaddad123!"
    }).expect(201)

    //Assert the datbase changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about response
    expect(response.body).toMatchObject({

        user: {
            name: "Saari Haddad",
            email: "max_m391@yahoo.com"
        },
        token: user.tokens[0].token

    })

    expect(user.password).not.toBe("hhaddad123!")
    
})


test('should login existing user', async () => {
    const response =  await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    //Assertion about response
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent users', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "unknown123"
    }).expect(400)
})

test('Should get profile for user', async () => {

    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

})

test('Should not get profile for unauthentucated user', async() => {
    await request(app).get('/users/me')
        .send()
        .expect(401)

})

test('Should delete account for user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

  //Make sure the user was deleted 
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload user avatar', async () => {

    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})

test('Should update valid user field', async () => {

    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Melek Haddad"
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Melek Haddad')
})

test('Should not update invalid user fields', async () => {

    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({

            location: "Dallas"
        }).expect(400)

})