module.exports = {
    apps : [
        {
          name: "Penguins Game 0 5002",
          script: "./app.js",
          watch: true,
          env: {
              "PORT": 5002,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 5002,
              "NODE_ENV": "production",
          }
        }
    ]
  }