import Link from 'next/link';
const qs = require('qs');

const Article = ({ article }) => {
  const date = new Date(article.date).toDateString();
  return (
    <div className="article-full">
      <div className="article-details">
        <h1>{article.title}</h1>
        <p className="article-author">
          <img src={`http://localhost:1337${article.author.data.attributes.photo.data.attributes.url}`} />
          <Link href={`/author/${article.author.data.attributes.username}`}>
            {article.author.data.attributes.name}
          </Link>{' '}
          on {date}
        </p>
      </div>
      <article>{article.content}</article>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch('http://localhost:1337/api/articles');
  const articles = await response.json();
  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    const query = qs.stringify({
        populate: [
          'photo',
          'author',
          'author.photo'
        ],
        filters: {
            slug: {
              $eq: params.slug,
            },
          }
      }, {
        encodeValuesOnly: true,
      });
  const response = await fetch(
    `http://localhost:1337/api/articles?${query}`
  );
  const articles = await response.json();

  return {
    props: { article: articles.data[0].attributes },
    revalidate: 1,
  };
}

export default Article;