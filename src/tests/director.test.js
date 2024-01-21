const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async() => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /directors debe crear un director ', async() => {
    const newDirector = {
        firstName: 'Brian',
        lastName: 'Palma',
        nationality: 'American',
        image: 'https://image1',
        birthday:'11-10-1940'
    }
    const res = await request(app).post('/directors').send(newDirector);
    //console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName)
 });

  test('PUT /directors/:id debe actualizar un director', async() => { 
    const director = {
        firstName: 'Brian actualizado',
        lastName: 'Palma actualizado',
        nationality: 'American',
        image: 'https://image1',
        birthday:'11-10-1943'
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
   });

   test('DELETE /directors/:id debe borrar un director', async() => { 
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204)
    });