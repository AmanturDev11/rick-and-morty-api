import { useState, useEffect } from "react";
import scss from "./Cards.module.scss";

// const url = "https://rickandmortyapi.com/api/character";

const Cards = () => {
	const [cards, setCards] = useState([]);
	const [itemModal, setItemModal] = useState(null);
	const [modal, setModal] = useState(false);

	useEffect(() => {
		async function getUser() {
			try {
				const response = await fetch(
					"https://rickandmortyapi.com/api/character"
				);
				const results = await response.json();
				setCards(results.results);
			} catch (error) {
				console.log(error);
			}
		}
		getUser();
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "Alive":
				return "#18f000";
			case "Dead":
				return "#ff1900";
			default:
				return "#676767";
		}
	};

	const openModal = (mod) => {
		setItemModal(mod);
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};

	return (
		<div className={scss.Cards}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.cards}>
						<div className={scss.cardContent}>
							{cards.map((item) => (
								<div
									onClick={() => openModal(item)}
									className={scss.card}
									key={item.id}>
									<h1>{item.name}</h1>
									<h1>{item.status}</h1>
									<p>{item.species}</p>
									<p>{item.gender}</p>
									<p>{item.type}</p>
									<img src={item.image} alt="" />
								</div>
							))}
							{modal && (
								<div>
									<div className={scss.modalCards} onClick={closeModal}>
										<div
											style={{
												backgroundColor: getStatusColor(itemModal.status),
											}}
											className={scss.modal}>
											<h1>{itemModal.name}</h1>
											<h1>{itemModal.status}</h1>
											<p>{itemModal.species}</p>
											<p>{itemModal.gender}</p>
											<p>{itemModal.type}</p>
											<img src={itemModal.image} alt="" />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cards;
