---
title: Shiftboard
summary: A self-hosted on-call rota for small teams.
category: web
tags: [TypeScript, SQLite, Caddy]
repoUrl: https://github.com/b0mann
liveUrl: https://example.com
date: 2025-11-08
usage: docker compose up -d
sample: true
---

## The problem

On-call lives in a spreadsheet until two people each think the other has the pager.

## The approach

The front page answers one question: who is on call now, and who is next.

- Rotations are rules, so swaps do not break the schedule
- One container, one SQLite file, Caddy for TLS

## What I would change

Sign-in is a shared team password. Single sign-on is the obvious next step.
