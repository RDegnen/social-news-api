# If running sh scripts/load-vars.sh doesn't work then running the below
# command from terminal will load the env variables to connect to postgres

export $(cat .env)
