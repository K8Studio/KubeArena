#!/bin/bash

CLUSTER_NAME="kube-arena"

echo "🧨 Tearing down Kind cluster: $CLUSTER_NAME"
kind delete cluster --name "$CLUSTER_NAME"

echo "🧹 Cleanup complete."