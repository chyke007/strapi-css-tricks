import Link from 'next/link';

const ArticleCard = ({ article }) => {
  const date = new Date(article.date).toDateString();
  return (
    <div className="article">
      <div className="cover-image">
        <img src={`http://localhost:1337${article.photo.data.attributes.url}`} />
      </div>
      <div className="article-info">
        {article.tags.data.map((tag, i) => (
          <Link href={`/tag/${tag.attributes.tagname}`} key={i}>
            <span className="tags">{tag.attributes.tagname}</span>
          </Link>
        ))}
        <Link href={`/article/${article.slug}`}>
          <h2>{article.title}</h2>
        </Link>
        <div className="article-brief">{article.brief}</div>
        <p className="author-info">
          <img src={`http://localhost:1337${article.author.data.attributes.photo.data.attributes.url}`} />
          <Link href={`/author/${article.author.data.attributes.username}`}>
            {article.author.data.attributes.name}
          </Link>{' '}
          on {date}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;