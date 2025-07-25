# 🔐 Kubernetes Security Lab with Kind

This project provides a local Kubernetes cluster (via [Kind](https://kind.sigs.k8s.io/)) to simulate real-world Kubernetes security issues and their mitigations. It is designed for hands-on training, testing, and demonstrations of common misconfigurations and vulnerabilities in Kubernetes environments.

---

## 🔍 Included Scenarios

### 01 - RBAC Misconfiguration
Grant excessive permissions to a ServiceAccount.

**Exploit:** Use `kubectl auth can-i` to find and perform unauthorized actions.

---

### 02 - Privilege Escalation via HostPath
Pod with `hostPath` mount to host filesystem.

**Exploit:** Modify `/etc/shadow`, read host files, or tamper with kubelet configs.

---

### 03 - Access to Kubernetes Secrets
Pod can list or read Kubernetes secrets.

**Exploit:** Use `kubectl get secrets` or query the metadata API from within a pod.

---

### 04 - Privileged Container Abuse
Pod runs as privileged or with unsafe capabilities.

**Exploit:** Gain host access, load kernel modules, or perform container breakout.

---

### 05 - Unsafe HostPath Mounts
Containers mount host directories unsafely (e.g., `/var/run`, `/etc`, or `/root`).

**Exploit:** Modify host binaries, read sensitive files, or perform privilege escalation.

---

### 06 - Kubelet API Exploitation
Access unauthenticated or exposed Kubelet APIs.

**Exploit:** Use Kubelet’s `/pods`, `/metrics`, or `/run` endpoints for recon or abuse.

---

### 07 - Network Policy Misconfiguration
No restrictive network policies between pods or namespaces.

**Exploit:** Perform lateral movement across services and namespaces.

---

### 08 - Docker Socket Exposure
Mount Docker socket (`/var/run/docker.sock`) inside containers.

**Exploit:** Gain full control over the host by accessing Docker APIs.

---

### 09 - Default Namespace Abuse
All resources are deployed in the `default` namespace with no isolation.

**Exploit:** Perform recon and lateral movement without namespace boundaries.

---


## 📦 Project Structure

```
k8s-security-lab/
├── kind-cluster/
│   ├── cluster-config.yaml
│   ├── create-cluster.sh
│   └── teardown-cluster.sh
├── scenarios/
│   ├── 01-rbac-misconfig/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 02-privilege-escalation/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 03-secrets-exposure/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 04-privileged-container/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 05-hostpath-mount/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 06-kubelet-api/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 07-network-policy/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 08-docker-socket/
│   │   ├── README.md
│   │   └── manifest.yaml
│   ├── 09-default-namespace/
│   │   ├── README.md
│   │   └── manifest.yaml
├── docs/
│   └── usage.md
├── tools/
│   └── deploy-tools.sh
└── README.md
```

## 🚀 Getting Started

See [docs/usage.md](docs/usage.md) for setup instructions.


