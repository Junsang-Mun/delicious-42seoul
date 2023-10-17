import { text, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const { cluster } = await request.json();
	const url = import.meta.env.VITE_DB_URL;
	const apiKey = import.meta.env.VITE_DB_API_KEY;

	try {
		const response = await fetch(`${url}/query`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-KEY': apiKey,
			},
			body: JSON.stringify({
				'query': [{
					'cluster': cluster,
				}]
			}),
		});
		// console.log(await response.json());
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return new Response(JSON.stringify(data));
		}
		throw error(500, 'Internal Database Error');

	} catch (e) {
		console.error(e);
	}
}

// export async function POST({ request }) {
// 	const { cluster } = await request.json();
// 	const url = process.env.DB_URL;
// 	const apiKey = process.env.DB_API_KEY;

// 	fetch(`${url}/query`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'X-API-KEY': apiKey,
// 		},
// 		body: JSON.stringify({
// 			'query': [{
// 				'cluster': cluster,
// 			}]
// 		}),
// 	}).then((r) => {
// 		if (r.status === 200 || r.status === 201) {
// 			return r.json();
// 		}
// 		return error(500, `Internal Server Error: ${r.status}`);
// 	}).then((d) => {
// 		return new Response(d);
// 	})
// }

export async function fallback() {
	return text(':jokebear:');
}