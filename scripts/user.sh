#!/bin/bash
TOKEN="CCxug3kY5BieuhdMd1IRl7uUn3sCFmkO/G3OncRnfDo=--QHSu/USk9LfT1PDMlU3qrp5zyf4ca8WXUShIFM9vCDE="
ID="42"
curl --include --request GET http://localhost:3000/users/$ID \
  --header "Authorization: Token token=$TOKEN"
