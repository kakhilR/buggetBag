import axios from 'axios'
import dotenv from 'dotenv'  

dotenv.config()

// export class WalletClient {
//     private baseURL: string

//     constructor(){
//         this.baseURL = WALLET_SERVICE_URL || ''
//     }

//     async getWallet(userId: string) {
//         console.log(WALLET_SERVICE_URL,"WALLET_SERVICE_URL")
//         const response = await axios.get(`${this.baseURL}/${userId}/balance`)
//         return response.data
//     }

//     async debitWallet(userId: string, amount: number) {
//         console.log('Wallet Service URL debit:', WALLET_SERVICE_URL)
//         const res = await axios.post(`${this.baseURL}/debit`, { userId, amount })
//         return res.data;
//       }
    
//     async creditWallet(userId: string, amount: number) {
//         console.log('Wallet Service URL credit:', WALLET_SERVICE_URL)
//         const res = await axios.post(`${this.baseURL}/credit`, { userId, amount })
//         return res.data;
//     }
// }

export class WalletClient {
  baseURL = process.env.WALLET_SERVICE_URL

  async getWallet(userId: string) {
    const res = await axios.get(`${this.baseURL}/${userId}`, {
      headers: { "x-service-token": process.env.SERVICE_TOKEN }
    })
    return res.data
  }

  async debitWallet(userId: string, amount: number) {
    await axios.post(`${this.baseURL}/internal/debit`, { userId, amount }, {
      headers: { "x-service-token": process.env.SERVICE_TOKEN }
    })
  }

  async creditWallet(userId: string, amount: number) {
    await axios.post(`${this.baseURL}/internal/credit`, { userId, amount }, {
      headers: { "x-service-token": process.env.SERVICE_TOKEN }
    })
  }
}
