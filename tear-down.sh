#!/bin/bash

CLUSTER_NAME="KubeArena"

echo "🧨 Tearing down Kind cluster: $CLUSTER_NAME"
kind delete cluster --name "$CLUSTER_NAME"

echo "🧹 Cleanup complete."