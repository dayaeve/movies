const request = require('supertest');
const app = require('../app');
require('../models')
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('GET /movies debe traer todos las peliculas', async() => { 
    const res = await request(app).get('/movies');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /movies debe crear una pelicula ', async() => {
    const newMovie = {
      name: 'Scary Movie',
      image: 'https://movie2',
      sypnosis: 'fhshdskklsdldsllsdkfhgkhkaskl',
      releaseYear: 2012
    }
    const res = await request(app).post('/movies').send(newMovie);
    //console.log(res.body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name)
 });

 
 test('PUT /movies/:id debe actualizar una pelicula', async() => { 
    const movie = {
        name: 'Scary movie actualizado'
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
   });

 test('POST /movies/:id/genres debe insertar los generos de una pelicula', async() => {
    const genre = await Genre.create ({
        name: 'genre test'
    })
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id])
    console.log(res.body);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
   });

   test('POST /movies/:id/directors debe insertar los directores de una pelicula', async() => {
    const director = await Director.create ({
        firstName: 'test 1234',
        lastName: 'Palma',
        nationality: 'American',
        image: 'https://image3',
        birthday:'11-10-1942'
    })
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id])
    console.log(res.body);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
   });

   test('POST /movies/:id/actors debe insertar los actores de una pelicula', async() => {
    const actor = await Actor.create ({
        firstName: 'test 1678',
        lastName: 'Palma',
        nationality: 'American',
        image: 'https://image9',
        birthday:'11-10-1945'
    })
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id])
    console.log(res.body);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
   });


   test('DELETE /movies/:id debe borrar una pelicula', async() => { 
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204)
    })