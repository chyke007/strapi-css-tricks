import ArticleCard from '../components/ArticleCard';
const qs = require('qs');

export default function Home({ articles }) {
  return (
    <div className="article-grid">
      {articles.map((article, i) => (
        <ArticleCard article={article.attributes} key={i} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {

  const query = qs.stringify({
    populate: [
      'tags',
      'author',
      'author.photo',
      'photo'
    ],
  }, {
    encodeValuesOnly: true,
  });

  const response = await fetch(`http://localhost:1337/api/articles?${query}`);
  const articles = await response.json();
  return {
    props: {
      articles: articles.data,
    },
  };
}