import { text, error } from '@sveltejs/kit';
import env from 'dotenv'

env.config();

export async function POST({ request }) {
	const { access_token } = await request.json();

	try {
		const response = await fetch(`https://api.intra.42.fr/v2/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Bearer ${access_token}`,
			},
		});

		if (response.status !== 200) {
			throw error(response.status, 'Check access_token again');
		}

		const data = await response.json();
		console.log(data);
		return new Response(JSON.stringify({
				'login': data.login,
				'image': data.image.link,
				'jokebear': 'cute',
			}), {
			headers: {
				'Content-Type': 'application/json',
			},
			status: 200
		});

	} catch (e) {
		console.error(e);
	}
}

export async function fallback() {
	return text(':jokebear:');
}