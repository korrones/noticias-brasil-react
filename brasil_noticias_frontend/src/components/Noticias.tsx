// src/components/Noticias.tsx
import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  url: string;
  description: string;
}

export default function Noticias() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = '5ef99561ea2a48748e2da9d03d19418b';
    const keyword = 'brasil';
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          setError('Falha ao carregar notícias');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Erro ao carregar notícias');
      });
  }, []);

  if (error) return <div>Erro: {error}</div>;
  if (articles.length === 0) return <div>Carregando notícias...</div>;

  return (
    <div>
      <h2>Notícias sobre Brasil</h2>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
