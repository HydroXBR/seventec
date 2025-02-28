import pkg from "mongoose"
const {Schema, model} = pkg


const schema = Schema({
	date: {type: Date, required: true},
    message: {type: String, default: ""}
})

const log = model('logs', schema)
export default log