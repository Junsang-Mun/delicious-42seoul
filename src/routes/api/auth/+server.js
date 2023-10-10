import { text, error } from '@sveltejs/kit';
import env from 'dotenv'

env.config();

export async function POST({ request }) {
	const { code } = await request.json();
	const client = process.env.UID_42;
	const secret = process.env.SEC_42;
	const r_url = process.env.R_URL;
	const payload = new URLSearchParams({
		grant_type: 'authorization_code',
		client_id: client,
		client_secret: secret,
		code: code,
		redirect_uri: r_url,
	});

	try {
		const response = await fetch(`https://api.intra.42.fr/oauth/token?${payload}`, {
			method: 'POST',
			body: payload,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		if (response.status !== 200) {
			throw new Error(`Response status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return new Response(JSON.stringify({
				'access_token': data.access_token,
				'expires_in': data.expires_in,
				'jokebear': 'cute',
			}), {
			headers: {
				'Content-Type': 'application/json',
			},
			status: 200
		});

	} catch (e) {
		throw error(500, 'Server-side Error');
	}
}

export async function fallback() {
	return text(':jokebear:');
}