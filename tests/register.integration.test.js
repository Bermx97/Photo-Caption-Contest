const request = require('supertest');
const app = require('../app');
const loginService = require('../src/services/login.service');
const registerService = require('../src/services/register.service');

jest.mock('../src/services/login.service');
jest.mock('../src/services/register.service');

describe('POST /register', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if the user is not specified', async () => {
        const response = await request(app)
        .post('/register')
        .send({ password: 'password' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('username must be 3-20 characters long');
    });

    it('should return 400 if the password is not specified', async () => {
        const response = await request(app)
        .post('/register')
        .send({ username: 'Test' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Password must be at least 6-25 characters long');
    });

    it('should return 409 if username already taken', async () => {
        loginService.findUser.mockResolvedValue({ rows: [{ id: 5, username: 'Test', password: 'password' }] });
        const response = await request(app)
        .post('/register')
        .send({ username: 'Test', password: 'Password' });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('Username already taken');
    });

    it('should return 201 if the username is available and the password has been created correctly', async () => {
        loginService.findUser.mockResolvedValue({ rows: [] });
        registerService.createUser.mockResolvedValue({ id: 45, username: 'testUser' });
        const response = await request(app)
        .post('/register')
        .send({ username: 'testUser', password: 'Password' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('user added');
    });
});