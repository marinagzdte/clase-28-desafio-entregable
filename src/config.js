import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default {
    mariaDb: {
        client: "mysql",
        connection: {
            host: '127.0.0.1',
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: 'mocks-normalizr'
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "mocks-normalizr",
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDM6AUlGPxn8qUs\neZVOhqaZu6u0L8BJtTLwQrJWVZeUOkuWmflqmhAbU1gobbj3ntAY5tZrJ6LKnjlP\nSQMeH9DrenMb/EJNjwGvYnftHCFfk1fRV1bDvh4jU+0lvoB4aZluoPrmTU9P6UzM\nK1C3FOyqtg2UYE9cCIFtnq6GK6NgzlGNavCBJwBuxa25t1RPUy0LHQPxuO8F2RB+\nzMu8oCa5wx2StI2SJRrWGqpcodRyi2+A/EMbw5591tFwa7d0VAQAw/nJr7NGR0YI\nxc7/h5k8K+GioBRc7L/BPvq+SU9T9Aume3PoKGou/chx9fXDm4sRRlFphEGEX3Hp\nnCKX4TtdAgMBAAECggEAHOdTpnZ+UDlhhEMIRSHoSUI4R7v+n0cQjuSRnG0Jay7H\n78/7Z0ahJAGfK2DC2ScNSp3xO/9Eztj/04fEiVDKmxTUPOvZ/G/COJemvAseSAmU\nNyLfSdA9FxWlG5BiNdoLexf5HFhmairKGvi3M4QfmDsC8l2dhCls/GYIT0PDkYl4\nSQUVCE6r3nNb+EXXbSLcPWe9aZJxjjfUr0xTf2zxx53sQ8TJ8+LVXajCtmFmZ1mt\nDc+jLtyziOVVpjhQ5GAnbDiuiyRQVo9lTK5mNyTdzZLkQbjHxeJBdK3lVoPy7Mau\nEm/PHm6btCavWKgfgoBTE4s/xdYgeZzXTTifMoIFHwKBgQDl58Lpy0R5FhX51NrB\nkWYMPAtIYK4z6szwstnOxEk/19yfTUsV47v2EoURPKAZlupqOJpOhLqA9YY80Z4n\nWa74aF0+lCW2XpHkGtKiPlH+l8y9G5qBA1OnHEU15a2eDoaQkuNwmazKYgIgIdZ1\nVpmbJH2lY/3siVJKC/UeZ55iNwKBgQDkKeBLke9RTUVW4uMIp9kDZHgL3XnpSqrJ\n/S98v50cEEBbhqrCauOsorzsrqHL5T/yz/xaZnBo73xHCg48G8dgEtphU0jJjbPd\nBNiGJM1KC7ac7gIA4bfMJY3r4XKnhHAvWWGcM7nbyd7pwP8/4sXieF72WEygcu+O\nIZVWUd+VCwKBgQCsD7/4aYBdfwIDcCIoLEFLdsSa7oBxqpCms7P+4zhO56beMmK3\nhzDtAP9F3zGS9TeLN8GEciGC0j4c1mSe3qfskW73nrh6vFxDcy+g7TNAbytzfG0t\nkOfScX360GIXoJdlLAm8A8cl0CP3GFwAhUeArNa8KRGpLTzA3iIdFz+aEQKBgDDF\nhs2Al3CAnPbSrwc1odzoyAR5RksJC/L7bQA0kWfjTW6DHdNLN/m6G7pYJfvIuF+1\n99J3HUZBEwa4boyIv5iYzxeIzwFOigkPtR0PltZiJJntAn6fwUMhL/IhEfofBEAK\n0iOqpusFfuHmwGkul3AunNX5z/9oMi7mnN6Dx9A7AoGAX7y8gvpFsluRAj0PMyxN\n1RpeoxPIoj0wBuQ2Murv0VxppMX6KqhfVeD7xcNXE16opk7B1ZCovOgVGyRwmm41\nWdRyAZarGQcByyPyZ3Acic38G+THZ1h+EXzB31yrR5pyt7ysMPcTogvwosIKTlFP\nDzssgzycoctLkF6bNqn9S+s=\n-----END PRIVATE KEY-----\n',
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iz6z3%40mocks-normalizr.iam.gserviceaccount.com"
    },
    mongodb: {
        connectionString: process.env.MONGODB_CONNECTION_STRING,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}
