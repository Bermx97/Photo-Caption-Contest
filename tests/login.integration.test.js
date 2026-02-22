const request = require('supertest');
const app = require('../app');
const loginService = require('../src/services/login.service');
jest.mock('../src/services/login.service');
const bcrypt = require('bcrypt');

describe('POST /login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if the username is empty', async () => {
        const response = await request(app)
        .post('/login')
        .send({ password: 'password' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username is required');
    });

    it('should return 400 if the password is empty', async () => {
        const response = await request(app)
        .post('/login')
        .send({ username: 'Test' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Password is required');
    });

    it('should return 401 if user is not finded', async () => {
        loginService.findUser.mockResolvedValue({ rows: [] })
        const response = await request(app)
        .post('/login')
        .send({ username: 'Test', password: 'password' });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid login credentials');
    });

    it('should return 401 if password is wrong', async () => {
        loginService.findUser.mockResolvedValue({ rows: [{ id:1, username: 'testUsername', password: 'password' }] });
        const response = await request(app)
        .post('/login')
        .send({ username: 'testUsername', password: 'wrongPassword' });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid login credentials');
    });

    it('should return 200 when password is correct', async () => {
        const hashedPassword = await bcrypt.hash('password', 10);
        loginService.findUser.mockResolvedValue({ rows: [{ id:1, username: 'testUsername', password: hashedPassword }] });
        const response = await request(app)
        .post('/login')
        .send({ username: 'testUsername', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('logged');
    });
});