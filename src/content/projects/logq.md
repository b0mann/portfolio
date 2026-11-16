---
title: logq
summary: Query journald and plain log files with one syntax.
category: tools
tags: [Go, journald, CLI]
repoUrl: https://github.com/b0mann
date: 2026-03-21
usage: logq 'unit=nginx status>=500' --since 1h
sample: true
---

## The problem

During an incident the question is simple: what failed on this unit in the last hour.

## The approach

One command with a small filter language. It reads journald, plain files or standard input.

- Filters are `field=value` pairs with numeric comparisons
- Output is plain lines, or JSON with `--json`

## What I would change

Parsing is single threaded. Rotated archives would benefit from reading compressed files in parallel.
