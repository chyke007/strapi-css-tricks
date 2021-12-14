const qs = require('qs');

const Tag = ({ tag }) => {
    return (
      <div className="tag-page">
        <h3>articles tagged</h3>
        <h1>{tag.tagname}</h1>
      </div>
    );
  };
  
  export async function getStaticPaths() {
    const response = await fetch('http://localhost:1337/api/tags');
    const tags = await response.json();
    return {
      paths: tags.data.map((tag) => ({
        params: {
          tagname: tag.attributes.tagname,
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
            tagname: {
              $eq: params.tagname,
            },
          }
      }, {
        encodeValuesOnly: true,
      });
    const response = await fetch(
      `http://localhost:1337/api/tags?${query}`
    );
    const tags = await response.json();
  
    return {
      props: { tag: tags.data[0].attributes },
      revalidate: 1,
    };
  }
  
  export default Tag;