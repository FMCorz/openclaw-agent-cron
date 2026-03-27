---
name: agent-cron
description: Manage one-off and scheduled tasks (reminders, jobs, cron, tasks) for this agent. This skill describes how to use the `agent-cron` tool. Use this when the `cron` tool is unavailable. Only read when you intend to schedule a cron.
---

_This skill describes the `agent-cron` tool._

# Agent cron

The `agent-cron` tool is a replacement for the `cron` tool (shipped with OpenClaw) which is not available to most agents due to security restrictions. This tool remedies the security issues by forcing the cron jobs to be attached to the calling agent.

## Actions

- `add`: Create a one-off or recurring job. Requires job with `name`, `schedule`, and `message`.
- `list`: List jobs for this agent. Use `includeDisabled: true` to include disabled jobs.
- `remove`: Delete a job by `jobId`.
- `run`: Run a job immediately by `jobId`. Useful when a user asks to immediately test or run a job.

## Add action

```json
{
    "action": "add",
    "job": {
        "name": "<string, required>",
        "schedule": { ... },   // Required, see below
        "message": "<string, required>"   // Instruction to the agent when the job runs, see below
    }
}
```

### Schedule formats

**at**: To run once at a specific time

```json
{ "kind": "at", "at": "<ISO-8601 timestamp>" }
{ "kind": "at", "at": "<ISO-8601 timestamp>", "tz": "<optional-timezone>" }

**every**": Run on an interval (milliseconds)

```json
{ "kind": "every", "every": <interval-ms> }
```

**cron**: Run on a cron expression

```json
{ "kind": "cron", "cron": "<cron-expression>", "tz": "<optional-timezone>" }
```

### Job message

The job's `message` is a message containing the instructions to yourself, the agent. Write it carefully. Instruct yourself what to do. The agent's output will be delivered to the user.

When the user asks to be notified here or there, IGNORE those instructions completely and write the message so that the response to the user is the output from the agent. DO NOT instruct yourself to send the message.

Examples:

- Job message: What is the current time?
  - Expected agent response: It is 8:00PM

- Job message: Respond with a friendly reminder to John that he must do the groceries!
  - Expected agent response: Don't forget to do the groceries!
