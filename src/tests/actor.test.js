const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async() => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /actors debe crear un actor ', async() => {
    const newActor = {
        firstName: 'Brad',
        lastName: 'Pitt',
        nationality: 'American',
        image: 'https://image',
        birthday:'12-18-1963'
    }
    const res = await request(app).post('/actors').send(newActor);
    //console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName)
 });

  test('PUT /actors/:id debe actualizar un actor', async() => { 
    const actor = {
        firstName: 'Bratt actualizado'
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
   });

   test('DELETE /actors/:id debe borrar un actor', async() => { 
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204)
    })