
export class UserFactory{
    static createUser({email, passwordHash, name, role}: {email: string, passwordHash: string, name: string, role: string}){
        if(role === 'ADMIN') return { name, email, passwordHash, role: 'ADMIN' }
        return { name, email, passwordHash, role: 'USER' }
    }
}