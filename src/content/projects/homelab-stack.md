---
title: Homelab Stack
summary: One Ansible repository that rebuilds the whole homelab.
category: automation
tags: [Ansible, Docker, WireGuard, restic]
repoUrl: https://github.com/b0mann
featured: true
date: 2026-06-02
usage: ansible-playbook site.yml --limit nas --check
sample: true
---

## The problem

Six months in, nobody remembers why a port is open.

## The approach

Every host is a list of roles in one repository. A fresh install plus one playbook run returns it to a known state.

- A base role hardens SSH and the firewall
- restic backs up nightly and test-restores monthly

## What I would change

Secrets live in Ansible Vault, which is awkward with a second person. SOPS with age keys is next.
