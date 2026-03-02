# Agent cron extension

Agent-scoped scheduled tasks for OpenClaw. The `agent-cron` tool lets agents **list, add, remove, and run** cron jobs that belong only to the current agent. All jobs are created with `sessionTarget: "isolated"` and `delivery.mode: "announce"`, with channel/recipient inferred from the current chat when possible (including Telegram topics) and `bestEffort: true`.

## Enable

Add `agent-cron` to your agent's tool allowlist (or use a profile that includes it):

```json5
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": {
          "allow": ["agent-cron"]
        }
      }
    ]
  }
}
```

## Actions

- **list**
  - Lists cron jobs for this agent only.
  - Optional `includeDisabled: true` includes disabled jobs in the result.
  - Returns `{ jobs: CronJob[], total: number }`, where `total` is the number of jobs visible to this agent.
- **add**
  - Creates a job. Requires a `job` object with `name`, `schedule`, and `message`:
    - `job.name: string` — required, non-empty.
    - `job.message: string` — required, non-empty; instructions to the agent when the job runs.
    - `job.schedule: ScheduleParams` — required (see **Schedule formats** below).
  - Jobs are always created as isolated sessions and announce delivery; channel/to are inferred from the current session key when available.
- **remove**
  - Deletes a job by `jobId`.
  - The tool first lists jobs for the current agent and will only remove a job that belongs to this agent; otherwise it throws `Job not found or not owned by this agent`.
- **run**
  - Runs a job immediately by `jobId` (for testing).
  - Like **remove**, it only operates on jobs owned by this agent and will error if the job is not found or not owned.

## Scoping

Only jobs whose `agentId` matches the current agent are visible and mutable.
