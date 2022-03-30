# Art-Alliance

A full stack web application for employers who want to find freelancers for hire.

As someone who dabbled in both freelance work and hiring other creatives, I always thought it would be nice to have an app to find and hire talent in a quick and accessible social media style format. I also have a lot of friends who do freelance for a living so I thought something like this would be useful for them to find work.
## Live Demo

Try the application live [here:]
(https://art-alliance.herokuapp.com/)

## Technologies Used
  <dd>⋅⋅* React.js</dd>
  <dd>⋅⋅* Webpack</dd>
  <dd>⋅⋅* Node.js</dd>
  <dd>⋅⋅* Express.js</dd>
  <dd>⋅⋅* PostgreSQL</dd>
  <dd>⋅⋅* JavaScript</dd>
  <dd>⋅⋅* HTML5</dd>
  <dd>⋅⋅* CSS3</dd>
  <dd>⋅⋅* Babel</dd>
  <dd>⋅⋅* Heroku</dd>
  <dd>⋅⋅* AOS Library</dd>
  <dd>⋅⋅* Geocode</dd>
  <dd>⋅⋅* Babel</dd>

## Features
  <dd>⋅⋅*User can create a post</dd>
  <dd>⋅⋅*Use can view posts</dd>
  <dd>⋅⋅*User can edit post</dd>
  <dd>⋅⋅*User can delete post</dd>
  <dd>⋅⋅*User can save posts</dd>
  <dd>⋅⋅*User can view saved posts</dd>
  <dd>⋅⋅*User can view comments on a post</dd>
  <dd>⋅⋅*User can add comment</dd>
  <dd>⋅⋅*User can edit comment</dd>
  <dd>⋅⋅*User can delete comment</dd>
  <dd>⋅⋅*User can view location in Google Maps</dd>

## Stretch Features
<dd>⋅⋅*User can toggle Dark Mode<dd>

## Preview
![create-post](https://user-images.githubusercontent.com/90541276/160731438-8c0b77eb-e4f0-42cd-b199-1e4576a444dc.gif)

![location](https://user-images.githubusercontent.com/90541276/160732150-7a6b4b70-e8d3-4e88-b216-b560fc1f94f7.gif)


## Development
### System Requirements
<dd>⋅⋅*Node.js 10 or higher</dd>
<dd>⋅⋅*NPM 6 or higher</dd>
<dd>⋅⋅*Postgres</dd>
<dd>⋅⋅*VS Code or any similar IDE supporting JavaScript ES6</dd>

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
4. Create a new database
    ```shell
    createdb art-alliance
    ```
5. Import the example database
    ```shell
    npm run db:import
    ```
6. Start the database (optional - if pgweb is installed).
    ```shell
    pgweb --db=art-alliance
    ```
7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
      ```shell
      npm run dev
      ```


A detailed set of instructions for getting started, including:

Installing all dependencies using npm, etc.

Creating any necessary configuration files.

Any external services that need to be set up, such as 3rd-party APIs or cloud services like S3.

Configuring any necessary environment variables.

Running any necessary build scripts.

Importing any necessary database files.
