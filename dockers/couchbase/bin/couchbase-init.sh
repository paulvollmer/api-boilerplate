#!/bin/bash

# Initialize Couchbase.
echo "Initializing..."

couchbase-cli \
  cluster-init -c couchbase:8091 -u Administrator -p password \
  --cluster-username=$COUCHBASE_USER --cluster-password=$COUCHBASE_PASS \
  --cluster-ramsize=512 --cluster-index-ramsize=256 --cluster-fts-ramsize=256 \
  --services=data,index,query,fts

# TODO: multiple buckets.
couchbase-cli \
  bucket-create -c couchbase:8091 -u $COUCHBASE_USER -p $COUCHBASE_PASS \
  --bucket=$COUCHBASE_BUCKET --bucket-type=couchbase --bucket-port=11211 \
  --bucket-ramsize=128 --bucket-replica=0 --enable-flush=1 --wait

echo "Done."
