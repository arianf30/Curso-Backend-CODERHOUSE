## 1. Start with Fork & Cluster

```
npm start FORK // to run in fork mode

npm start CLUSTER // to run in cluster mode

npm start // fork is default mode
```

## 2. Run with nodemon

```
nodemon server.js // to run with nodemon and FORK default

ps // to see the list of process with SO (2 process)

// WITH CLUSTER

nodemon server.js CLUSTER // to run with nodemon and CLUSTER

ps // (6 process)
```

## 3. Run with forever
```
forever -w server.js // to run with forever and FORK default (modo escucha)

forever list // list of process with forever (2 process)

ps // to see the list of process with SO (2 process)

// WITH CLUSTER

forever -w server.js CLUSTER // to run with forever and CLUSTER (modo escucha)
```

## 4. Run with pm2
```
pm2 start server.js -w // to run with pm2 and FORK default (modo escucha)

ps -xa // to see the list of process with SO (1 process)

pm2 list // list of process with pm2 (1 process)

// WITH CLUSTER

pm2 start server.js -w -i max // to run with pm2 and CLUSTER (modo escucha)
```

## 5. NGINX

```
npm start FORK 8082
npm start FORK 8083
npm start FORK 8084
npm start FORK 8085

nginx -t // to test code
nginx -s reload // to reload .conf
```