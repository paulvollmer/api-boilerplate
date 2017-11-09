#!/bin/bash
set -ev

# Environment variables.
NODE_ENV=${NODE_ENV:-development}
COUCHBASE_USER=${COUCHBASE_USER:-Administrator}
COUCHBASE_PASS=${COUCHBASE_PASS:-password}

pushd `dirname $0`
docker-compose down
popd
