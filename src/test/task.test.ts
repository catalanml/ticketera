import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import mongoose from 'mongoose'
import app from '../app'
import User from '../models/User'
import Category from '../models/Category'
import Priority from '../models/Priority'
import Task from '../models/Task'
import { TaskStatusEnum } from '../enums/taskStatus.enum'
import 'dotenv/config'
import { } from 'vitest'

vi.setConfig({ hookTimeout: 20000 }) // 👈 duplica el timeout


let token: string
let userId: string
let categoryId: string
let priorityId: string
let taskId: string

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string)

    await request(app).post('/auth/register').send({
        name: 'Tester',
        email: 'tester@example.com',
        password: 'test1234'
    })

    const loginRes = await request(app).post('/auth/login').send({
        email: 'tester@example.com',
        password: 'test1234'
    })

    token = loginRes.body.token
    userId = loginRes.body.user._id

    // Crear categoría
    const catRes = await request(app)
        .post('/categories/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'TestCat' })


    categoryId = catRes.body.category.id

    // Crear prioridad
    const priRes = await request(app)
        .post('/priorities/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'testPriority', type: 1 })

    priorityId = priRes.body.priority.id

    // Crear tarea
    const taskRes = await request(app)
        .post('/tasks/create')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test Task',
            description: 'Tarea de prueba',
            category: categoryId,
            priority: priorityId,
            assignedTo: userId,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            status: TaskStatusEnum.TODO
        })

    taskId = taskRes.body.task._id
})

afterAll(async () => {
    await Task.deleteMany({})
    await Category.deleteMany({})
    await Priority.deleteMany({})
    await User.deleteMany({})
    await mongoose.disconnect()
})

describe('📌 Task Filters', () => {
    it('debería obtener tareas por usuario', async () => {
        const res = await request(app)
            .get(`/tasks/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
    })

    it('debería obtener tareas por status', async () => {
        const res = await request(app)
            .get(`/tasks/status/${TaskStatusEnum.TODO}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('debería obtener tareas por categoría', async () => {
        const res = await request(app)
            .get(`/tasks/category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('debería obtener tareas por prioridad', async () => {
        const res = await request(app)
            .get(`/tasks/priority/${priorityId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('debería obtener tareas por fecha de vencimiento', async () => {
        const res = await request(app)
            .get(`/tasks/due-date/${new Date().toISOString().split('T')[0]}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('debería obtener tareas creadas por el usuario', async () => {
        const res = await request(app)
            .get(`/tasks/created-by/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })
})
