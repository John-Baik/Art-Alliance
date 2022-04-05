# Art-Alliance

A full stack web application for employers who want to find creative freelancers for hire.

I always thought it would be nice to have an app to easily find work as a creative employee as well as discover other artists as an employer in an accessible social media style format. As someone who once did freelance work as a videographer, I feel that something like this would've been extremely useful for me to find work and potentially connect with other people in the field.
## Live Demo
Try the application live [here:](https://art-alliance.herokuapp.com/)
## Technologies Used
- React.js
- Webpack
- Node.js
- Express.js
- PostgreSQL
- JavaScript
- HTML5
- CSS3
- Babel
- Heroku
- AOS Library
- Google Maps API
- Geocode
## Features
- User can create a post
- Use can view posts
- User can edit post
- User can delete post
- User can save posts
- User can view saved posts
- User can view comments
- User can add comment
- User can edit comment
- User can delete comment
- User can view location in Google Maps

## Stretch Features
- User can create an account
- User can send or recieve messages
- User can toggle Dark Mode

## Preview
<img src="images/create-post.gif">
<img src="images/location.gif">

## Development
### System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- Postgres
- VS Code or any similar IDE supporting JavaScript ES6
### Getting Started

1. Clone the repository.
    ```shell
    git clone git@github.com:John-Baik/Art-Alliance.git
    cd art-alliance
    ```
2. Install all dependencies with NPM.
    ```shell
    npm install
    ```
3. Start postgreSQL.
    ```shell
    sudo service postgresql start
    ```
4. Create a new database.
    ```shell
    createdb art-alliance
    ```
5. Replace changeMe to art-alliance in .env.
    ```shell
    TOKEN_SECRET=art-alliance
    DATABASE_URL=postgres://dev:dev@localhost/art-alliance
    ```
6. Import the example database.
    ```shell
    npm run db:import
    ```
7. Start the database (optional - if pgweb is installed).
    ```shell
    pgweb --db=art-alliance
    ```
8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
