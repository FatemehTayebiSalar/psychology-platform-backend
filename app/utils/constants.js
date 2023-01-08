module.exports = {
    MongoIDPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES : Object.freeze({
       USER : "USER",
       ADMIN : "ADMIN",
       PSYCHOLOGIST : "PSYCHOLOGIST" 
    }),
    PERMISSIONS : Object.freeze({
        USER : ["profile"],
        ADMIN : ["all"],
        CONTENT_MANAGER : ["video" , "podcast" , "event" , "chapter" , "episode"],
        PSYCHOLOGIST : ["all"],
        ALL : "all"
     }),
    ACCESS_TOKEN_SECRET_KEY : "5D870B71CB5CA854D14540379B8680C11084E33FF42BD7E60E85F2CD406239DA",
    REFRESH_TOKEN_SECRET_KEY : "0AF84AA14617A7C96BA0102DC7F30011AAC9A371E33F447B93BF5875206B0F2E"
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MDAwOTM1MCwiZXhwIjoxNjcwMDE2NTUwfQ.EynKaVOXydLNaYNs9TcMFeZO_EhYNQjZVQI3RmKiA_k"