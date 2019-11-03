export const config = {
    "title": "Home Center",
    "versionRelease": "TBD",
    "versionTitle": "alpha",
    "version": "0.1.0.0",
    "path": __dirname,
    "debug": process.env.DATABASE_URL.substr(process.env.DATABASE_URL.length - 7, process.env.DATABASE_URL.length) === "default",
    "server": {
        "environment": process.env.NODE_ENVIRONMENT,
        "port": process.env.PORT,
        "domain": process.env.DOMAIN,
        "transport": process.env.TRANSPORT
    },
    "email": {
        "errorNotificationEmail": process.env.ERROREMAIL,
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "from": process.env.FROM
    },
    "database": {
        "dbUrl": process.env.DATABASE_URL
    },
    "session": {
        "secret": process.env.SECRET
    },
    "okta": {
        "issuer": process.env.OKTA_ORG_URL,
        "client_id": process.env.OKTA_CLIENT_ID,
        "client_secret": process.env.OKTA_CLIENT_SECRET
    }
};