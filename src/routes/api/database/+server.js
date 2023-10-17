import { text, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const { contributor, name, cluster, summary, detail } = await request.json();
	const url = import.meta.env.VITE_DB_URL;
	const apiKey = import.meta.env.VITE_DB_API_KEY;

	fetch(`${url}/items`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': apiKey,
		},
		body: JSON.stringify({
			'item': {
				'contributor': contributor,
				'name': name,
				'cluster': cluster,
				'summary': summary,
				'detail': detail,
			}
		}),
	}).then((r) => {
		if (r.status === 200 || r.status === 201) {
			// return r.json();
		}
		return error(500, `Internal Server Error: ${r.status}`);
	}).then((d) => {
		return new Response(d);
	})
}

export async function fallback() {
	return text(':jokebear:');
}