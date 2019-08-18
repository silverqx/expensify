# Expensify

Expensify react / redux test application with Firebase as data store and webpack as build tool.

Demo is hosted on Heroku https://cs-expensify-app.herokuapp.com

For tests is used jest with enzyme.

## 🚀 Quick start

1.  **Clone repository.**

    ```sh
    git clone https://github.com/silverqx/expensify.git
    ```

1. **Firebase.**

    Create Firebase DB, update env. variables in `.env.example` file and rename it to eg `.env.development`.

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd expensify/
    npm run dev-server
    ```

1.  **Unit Tests.**

    Run tests in watch mode.

    ```sh
    npm test -- --watch
    ```
1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8080`!

1.  **Production Builds**.

    Production builds will be in `dist/` folder.

    ```sh
    npm run build
    ```

1.  **Production Web Server**.

    For production web server is used [Express](https://expressjs.com) framework.

    ```sh
    npm start
    ```
