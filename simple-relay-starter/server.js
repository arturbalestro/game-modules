var express = require('express')
var graphqlHttp = require('express-graphql')
var schema = require('./schema/schema')

// The server is just a simple Express app
var app = express();
const GRAPHQL_PORT = 8080;

// We respond to all GraphQL requests from `/graphql` using the
// `express-graphql` middleware, which we pass our schema to.
app.use('/graphql', graphqlHttp({schema: schema, pretty: true, graphiql: true}))
app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// The rest of the routes are just for serving static files
app.use('/relay', express.static('./node_modules/react-relay/dist'))
app.use('/', express.static('./public'))

app.listen(3000, function() { console.log('Listening on 3000...') }) // eslint-disable-line no-console
