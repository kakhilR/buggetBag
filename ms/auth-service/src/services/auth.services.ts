import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository'
import { BcryptPasswordStrategu } from '../strategies/password.strategy';
import { UserFactory } from './user.factory';

const userRepo = new UserRepository();
const passwordStrategy = new BcryptPasswordStrategu()

export class AuthService {
    async signup(userData:any) {
        const { email, password, name, role } = userData
        const existingUser = await userRepo.findByEmail(email)
        if(existingUser) {
            throw new Error('User already exists')
        }
        const passwordHash = await passwordStrategy.hashPassword(password)
        const newUser = UserFactory.createUser({ email, passwordHash, name, role })
        return userRepo.create(newUser);
    }


    async login(data: any) {
        const { email, password } = data 
        const user = await userRepo.findByEmail(email)
        if(!user || !user.passwordHash) {
            throw new Error('Invalid email or password')
        }

        const isValidPassword = await passwordStrategy.comparePassword(password, user.passwordHash)
        if (!isValidPassword) throw new Error("Invalid credentials");

        const token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET!,{ expiresIn: "1h" })

        return { token, user }
    }

}