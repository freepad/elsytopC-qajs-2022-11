import { faker } from "@faker-js/faker";

export function generateUser(options) {

        return {
            userName: faker.internet.userName(),
            password: options?.password ?? faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/)
        }
}

