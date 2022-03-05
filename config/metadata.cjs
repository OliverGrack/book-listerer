const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'book-listerer',
  namespace: 'https://olii.dev/',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'https://www.thalia.at/*'
  ],
  require: [],
  grant: [
    'GM.xmlHttpRequest'
  ],
  connect: [
    'httpbin.org'
  ],
  'run-at': 'document-end'
}
