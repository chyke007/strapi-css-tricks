module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '635ad7ed02bc57a568210173298ec5c4'),
  },
});
