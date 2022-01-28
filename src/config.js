const config = {
    PERS: process.env.PERS,
    FILE_PATH: process.env.FILE_PATH,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_HOST: process.env.DB_HOST,
    DB_SQLITE_PATH: './DB/SQLITE/ecommerce.sqlite'
};

export default {
    ...config,
    mongodb: {
        host: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    file: {
        productFilePath: '/products.json',
        cartFilePath: '/carts.json',
    },
    firestore: {
        type: "service_account",
        project_id: "coderhouse-backend-f23d5",
        private_key_id: "e4be2c5d5331bd46a36f8571a2be1e573738774d",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2uDPGH9VisXpO\nNAxxWg6TU7AsrhzHlkKGQGa7SkKFpfbC/108IbSSWOYqkTZccmHK147x2ugrWBPq\n/mTOBlwQMKtnQFIt4GE9xOv0iYkeUfDzEiPe238i0ADlL6wd4gXVHAlVoM3KNoUJ\nIy+VA8KTE4ay/5Q3KSEybROx/ZqGwvYqSJaXXPpxegfbCbiralrRpY1Uqedjrzjw\nAglb+6mL3Hgh7LC7+7pkcvQ8T5IRzPNVmvPBifoVA2OMHpQR7UZ0mPplzRjVn6c4\nJR7szNczYWKBKlfJduj8hFbk19Nq1rutSTVEXhLYasN3DRYJ53TLiXe5Vman+T0r\nxLV7ERatAgMBAAECggEAAKh/NWbN9FvndeIKk5ZC7EG1Jje+9beOT3vM+40dxolR\nW4woGNKCQoxj5MlcWwAgojVEunmJAt+TMi1uudW6B6IhjmT3nPhio7/wE87j8mcq\n2n3qd5/ke20VKKp/rkzMq89QlUsSw+6Of6oBKwc/5pEdNXyg0TTR4FUCkE5ryp4r\nJpdWJVReLxwToXUHtcIxDUtT6H4U3p0rLtTYUT04bLIaUEY4OX0w2Yg0vj+dA/91\nXdWVE3iuet3e7WChU7WhGMXZJTmwhpB5dpF3yqhgT+BuP04W7tV1RNMXpLc/DrcJ\n/7Vsq8Q985PbUZBI2ECtVLq1T+sZSKqOfq8LlgtDvQKBgQDdvvosN+z4uKrQxdkk\nmQmhWKKdWqdnXdRIO2mON5n7CgWZHCmGwDsMb7jlwDhByZq0dE9Na1v6QaZzMQTk\n8Lzs1x6RpA1AY3ZFy/b23KjeXZ+nExy+BLVgOKIn8pb1BIZjxPpTV2Jnh0X0qLfF\nLPqHw8jsE9bMxxIikb7A+tcWZwKBgQDS8ejvR/D+M3rqAzTRcakqzpmy3JNVJO1t\nqSM0kLz363RZJmIcs+YutxsvxlxYS1o5I//W6MCHR9jIdvC22kATRwljK/LU6tzb\n/vtM4SmtUhLX/n70G0AL651GmAjknUNOq/UM2A6TkpUHp/nIuz5046yl05koMFHd\n8tu0bMk1ywKBgGlFhi1B6610ththIiJeyRShKKo9ZGYNRH96PTV4LhDhBCFZHlnL\nnvzbeVMRe2O4G0r6QL/HbSYUzrm3FtS9eWOTCP8pe+UKkxa1qywtO7o9hlLiHu4S\n/CyPFmSSpZnyqP5qgFDalmwB63MoOf5QySt1BkkVbg9Pnstsl7u0GjKXAoGBAI7O\nBEKRMn30vf5UY1pzFvIK4ZRrrTZUBIRbn6DDZ5pzBNYhnQQPagIwJbCHGhcQFClg\nzJ9h/IzYv9KeasFvKTejvKAtrXwk75XjnZ7jQ8K5MFaXTLzXAdnQDS4wWLzkFh/Z\nW9DxJ5USA+AmAHy6/kJFq6irgiDp7VJTShdwGhtXAoGAAL6JgZR+3vrm7iwcblXj\nQDHdJCmOHzeRqPi8AFANjSawSTZT7Sr4pu0e1A3xDg04zySym25w2iuYuhXjIsPi\nmk9z2DRNC/YlE6sGbSAvkAd5W6TcQbcAYm3NXl/8nRzW+zukw7cpDD9Kih/QbIcj\n6UOSFv+ZuWbj+wNV/5VDpDI=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-khl7l@coderhouse-backend-f23d5.iam.gserviceaccount.com",
        client_id: "115388008071153310470",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-khl7l%40coderhouse-backend-f23d5.iam.gserviceaccount.com"
    }
}