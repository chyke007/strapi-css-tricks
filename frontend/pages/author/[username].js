const qs = require('qs');

const Author = ({ author }) => {
    return (
      <div className="author-page">
        <img src={`http://localhost:1337${author.photo.data.attributes.url}`} />
        <div className="author-details">
          <h1>{author.name}</h1>
          <p className="bio">{author.bio}</p>
          <p>
            @{author.twitter} - {author.website}
          </p>
        </div>
      </div>
    );
  };

  export async function getStaticPaths() {

    const response = await fetch('http://localhost:1337/api/authors');
    const authors = await response.json();
    return {
      paths: authors.data.map((author) => ({
        params: {
          username: author.attributes.username,
        },
      })),
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
        
  const query = qs.stringify({
    populate: [
      'photo'
    ],
    filters: {
        username: {
          $eq: params.username,
        },
      }
  }, {
    encodeValuesOnly: true,
  });

    const response = await fetch(
      `http://localhost:1337/api/authors?${query}`
    );
    const authors = await response.json();
  
    return {
      props: { author: authors.data[0].attributes },
      revalidate: 1,
    };
  }
  
  export default Author;