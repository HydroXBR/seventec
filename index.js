import axios from 'axios'
import { join, basename, dirname } from "path"

import * as path from 'path'
import { fileURLToPath } from 'url';
const { token } = process.env
import express from 'express'
import cors from 'cors'
const { PORT } = process.env || 3000
const app = express()
import bodyParser from "body-parser"
const __dirname = dirname(fileURLToPath(import.meta.url))
import Db from "mongodb"
import log from "./database/log.js"
import im from "./db_connect.js"
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)

const fetch = s => import('node-fetch').then(({default: fetch}) => fetch(s))
im()

const headers = /** @type {import("http").OutgoingHttpHeaders} */ ({
		"Access-Control-Allow-Origin": "https://brainly.com.br",
	"Access-Control-Allow-Methods":"GET",
	"Access-Control-Allow-Headers":"X-Api-Token"
})

app.use(
	cors({ 
		exposedHeaders: [
			'Authorization'
		]
	}),
	bodyParser.json(),
	bodyParser.urlencoded({
		extended: true
	}),
	express.static(path.join(__dirname, '/interface'))
)

app.listen(PORT, () => {console.log(`Listening at ${PORT}`)})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/interface'))

app.get('/',function(req,res) {
	console.log("Access PRINCIPAL: "+ new Date())
	res.sendFile(__dirname + '/interface/index.html')
})

app.get('/newlog',function(req,res) {
	console.log("Access LOG: "+ new Date())
	const id = req.query.id
	const message = req.query.message

	const novolog = new log({
		date: new Date(),
		message: message		
	})

	novolog.save().then(() => {
		res.send({ success: true, reason: "success" })
		}).catch(error => {
			console.error("Erro", error)
			res.send({ success: false, reason: error })
		})
})

app.get('/logsdata', async function(req, res) {
    try {
        const logs = await log.find().sort({ date: -1 });
        res.json({ success: true, logs: logs });
    } catch (error) {
        console.error("Erro ao buscar logs:", error);
        res.status(500).json({ success: false, reason: "Erro ao buscar logs" });
    }
});