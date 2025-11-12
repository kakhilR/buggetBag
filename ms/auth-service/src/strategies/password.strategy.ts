import bcrypt from 'bcrypt'

export interface PasswordStrategy {
    hashPassword(password: string): Promise<string>
}


export class BcryptPasswordStrategu implements PasswordStrategy {
    async hashPassword(password: string) {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    }

    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}