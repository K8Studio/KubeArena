#!/bin/bash

set -e

CLUSTER_NAME="KubeArena"
CLUSTER_DIR="kind-cluster"
SCENARIO_DIR="scenarios"

echo "🚀 Creating Kind cluster: $CLUSTER_NAME"
kind create cluster --config "$CLUSTER_DIR/cluster-config.yaml" --name "$CLUSTER_NAME"

echo "📦 Building scenario images and applying manifests from $SCENARIO_DIR/..."

for scenario_path in "$SCENARIO_DIR"/*/; do
    echo "🔍 Processing scenario: $scenario_path"

    # Build image if build.sh exists inside an app/ folder
    if [ -x "${scenario_path}app/build.sh" ]; then
        echo "🐳 Building image for scenario at ${scenario_path}app/"
        (cd "${scenario_path}app" && ./build.sh)
    else
        echo "⚠️  No build.sh found in ${scenario_path}app/, skipping image build."
    fi

    # Apply the manifest.yaml if it exists
    manifest_file="${scenario_path}manifest.yaml"
    if [ -f "$manifest_file" ]; then
        echo "🔧 Applying manifest: $manifest_file"
        kubectl apply -f "$manifest_file"
    else
        echo "⚠️  No manifest.yaml found in $scenario_path, skipping apply."
    fi
done

echo "✅ Lab is ready. Use 'kubectl get pods -A' to verify workloads."
