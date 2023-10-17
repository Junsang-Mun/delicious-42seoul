import { text, error } from '@sveltejs/kit';

export async function GET() {
	const url = import.meta.env.VITE_DB_URL;
	const apiKey = import.meta.env.VITE_DB_API_KEY;

	try {
		const response = await fetch(`${url}/items/totalNumberOfUser`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-API-KEY': apiKey,
			},
		});

		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			console.log(data);
			return new Response(JSON.stringify(data));
		}
		throw error(500, 'Internal Database Error');

	} catch (e) {
		console.error(e);
	}
}

export async function fallback() {
	return text(':jokebear:');
}