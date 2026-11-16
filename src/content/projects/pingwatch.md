---
title: Pingwatch
summary: Agentless uptime checks with alerts that say what broke.
category: systems
tags: [Go, SQLite, systemd]
repoUrl: https://github.com/b0mann
featured: true
date: 2026-09-14
usage: pingwatch check --config /etc/pingwatch.toml
sample: true
---

## The problem

Most monitoring wants an agent on every host. For a handful of servers that is more moving parts than the thing being watched.

## The approach

One static binary reads a TOML file, probes each target on a schedule and keeps the results in SQLite.

```toml
[[check]]
name = "web"
url = "https://example.com/health"
interval = "60s"
```

## What I would change

Alert routing is hard-coded to email and a webhook. A small plugin interface would fix that.
