import React, { useEffect } from "react";
import { ItemCard } from "../components/ItemCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const sections = [
		{ title: "Characters", endpoint: "people", type: "character" },
		{ title: "Planets", endpoint: "planets", type: "planet" },
		{ title: "Starships", endpoint: "starships", type: "starship" },
	];

	const fetchSection = async (endpoint, key) => {
		try {
			const res = await fetch(`https://swapi.tech/api/${endpoint}/`);
			if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
			const data = await res.json();
			const items = data.results.map((item) => ({
				...item,
				id: Number(item.url.split("/").filter(Boolean).pop()),
			}));
			dispatch({ type: "setData", key, payload: items });
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		sections.forEach(({ endpoint, type }) => fetchSection(endpoint, type + "s"));
	}, []);

	return (
		<div className="container-fluid mt-1">
			{sections.map(({ title, type }) => (
				<div key={type}>
					<h1 className="text-white mb-1">{title}</h1>
					<div className="d-flex overflow-auto mb-5">
						{(store[type + "s"] || []).map((item) => (
							<ItemCard
								key={item.id}
								id={item.id}
								name={item.name}
								type={type}
								store={store}
								dispatch={dispatch}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};