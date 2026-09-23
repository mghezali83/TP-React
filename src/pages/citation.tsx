import axios from "axios";
import { useEffect, useState } from "react";

interface Quote {
    id: number;
    quote: string;
    author: string;
}

function Quote() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/quotes")
            .then((response) => {
                const quotes: Quote[] = response.data.quotes;

                const day = new Date().getDate();

                let selectedQuote: Quote;

                if (day <= 30) {
                    selectedQuote =
                        quotes.find((quote) => quote.id === day) ||
                        quotes[0];
                } else {
                    const randomIndex = Math.floor(
                        Math.random() * quotes.length
                    );

                    selectedQuote = quotes[randomIndex];
                }

                setQuote(selectedQuote);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    if (error) {
        return <p>Erreur lors du chargement de la citation.</p>;
    }

    if (!quote) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Citation du jour</h1>

            <p>"{quote.quote}"</p>

            <p>- {quote.author}</p>
        </div>
    );
}

export default Quote;