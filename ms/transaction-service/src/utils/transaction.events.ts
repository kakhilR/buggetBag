import { EventEmitter } from 'events'

class TransactionEvents extends EventEmitter {}

export const transactionEventEmitter = new TransactionEvents()

transactionEventEmitter.on('transactionSuccess',(data)=>{
    console.log('Transaction Successfull: ', data)
})

transactionEventEmitter.on('transactionFailed', (data) =>{
    console.log('Transaction Failed: ', data)
})