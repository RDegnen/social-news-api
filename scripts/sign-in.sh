#!/bin/bash
# mittens token - STOa42N4IW0lWwt9RWmckvH1EmDvlkV7jicfE93Oloo=--yNcZd8NjnpqIG4ZmX/Rx8NcAz5ZAaxE/xdYyty9z3io=
# ross token - BMAPQovNK2PXmLAX/4372T5XzCC4DUV8LWfA50/rbR4=--1qA44m5LuMUw76ugjusxqWf9374QFi2CuPuGzyfMPDk=

# curl --include --request POST http://localhost:3000/sign-in \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "mittens@ross.com",
#       "password": "mitt"
#     }
#   }'

  curl --include --request POST http://localhost:3000/sign-in \
    --header "Content-Type: application/json" \
    --data '{
      "credentials": {
        "email": "ross@ross.com",
        "password": "ross"
      }
    }'
