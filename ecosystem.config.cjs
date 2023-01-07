
module.exports = {
  apps : [{
    name   : "app",
    script : "index.js",
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    },
    env_staging: {
      NODE_ENV: "staging"
    },
    instances: 2,
    max_memory_restart: '200M'
  }]
}