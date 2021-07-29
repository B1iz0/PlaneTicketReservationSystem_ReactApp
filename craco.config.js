const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      shared: resolvePath('./src/components/shared'),
      components: resolvePath('./src/components'),
      services: resolvePath('./src/services'),
      constants: resolvePath('./src/constants'),
      reduxStore: resolvePath('./src/redux'),
      api: resolvePath('./src/api'),
    },
  },
};
