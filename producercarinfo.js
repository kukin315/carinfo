const {Kafka, Partitioners} = require('kafka')
const CarInfo = require('carinfo')
const carinfo = new CarInfo
const kafka = new Kafka({
    cliendId: 'CarInfo producer',
    brokers: ['localhost:9092']
})
const producer = kafka.producer({createPartiontioner: Paritioners.LegacyPartitioner})
const topic = 'CarInfo'
const producerMessage = async() => {
    try {
        const value = carinfo.info();
        console.log(value);
        await producer.send({
            topic,
            messages: [{value},],
        })
    } catch (error) {
        console.log(error);
    }
}
const run = async() => {
    //producing
    await producer.connect()
    setInterval(producerMessage, 1000)
}
run().catch(console.error)
