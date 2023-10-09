import { json, text } from '@sveltejs/kit';
import env from 'dotenv'

env.config();

export async function POST({ request }) {
	const { code } = await request.json();
	const client = process.env.UID_42;
	const secret = process.env.SEC_42;
	fetch('https://api.intra.42.fr/oauth/token', {
		method: 'POST',
		mode: 'no-cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			grant_type:'client_credentials',
			client_id: client,
			client_secret: secret,
			code: code,
		})
	}).then((response) => {
		response.json();
	}).then((data) => {
		console.log(data);
	});
	return json(code);
	// return json(code);
}

export async function fallback({ request }) {
	return text(`${request.method} is not allowed!`);
}