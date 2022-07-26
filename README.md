# a web ui for zerotier one
a small node webserver to host the web page and to proxy api requests to the zerotier service because the browser won't send the authtoken header itself (CORS).

It uses an api client generated from our openapi specs. 

# dev
- `npm install`
- `npm start`
- `browse to http://localhost:3000`


# prod
- `npm run serve`

There are PORT and TOKEN_FILE env vars if you need.

Will build production react build and then start the server.

Haven't test prod that much yet so might be missing some assumptions.
