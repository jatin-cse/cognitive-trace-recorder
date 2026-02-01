## Cognitive Trace Recorder – VS Code Extension

Cognitive Trace Recorder is a VS Code extension that records how developers think while coding, not just the code they write.
It captures cognitive traces such as pauses, file revisits, added and deleted comments, and thought evolution — helping developers understand their decision-making process during software development.

---

## Original Idea Notice

Cognitive Trace Recorder explores the idea of recording
developer cognitive signals (hesitation, abandoned thoughts,
and thought evolution) during coding.

This project is published to establish prior art and
encourage open exploration of developer cognition.

---
 
## What Are Cognitive Traces in Programming?

In programming, developers constantly make mental decisions:
- pausing before writing logic
- opening the same file repeatedly
- writing a comment, then deleting it
- revising an idea mid-sentence

These actions represent developer cognition, but traditional tools like Git only track final output.
A cognitive trace is a record of these invisible thinking signals.
This VS Code extension makes them visible.

---

##  Features
## File Activity Tracking

Tracks file open and revisit patterns
→ identifies confusion points and focus areas in codebases

## Hesitation Detection

Detects pauses in typing
→ signals uncertainty, planning, or problem-solving moments

## Comment Tracking

Logs when comments are added
→ captures explicit developer intent

## Deleted Comment Detection

Logs removed comments
→ records abandoned or reconsidered ideas

## Thought Evolution (Raw Mode)

Tracks how a line evolves (h → he → hel)
→ captures micro-level thought formation

---

## Privacy-First Design

- No internet access
- No cloud storage
- No telemetry
- Local-only data storage

All data is stored locally using the VS Code extension storage system.

---

 ## Example Output

```bash
{
  "type": "deleted_comment",
  "comment": "// this might break authentication"
}
```

This helps answer:

- Why did I hesitate here?
- What idea did I abandon?
- Which files cause the most cognitive load?

---

## Why This Project Exists

Most developer tools focus on:

- code output
- performance
- correctness

Very few tools focus on:

- developer thinking
- hesitation
- uncertainty
- decision-making

Cognitive Trace Recorder treats programming as a cognitive activity, not just text editing.

---

## Who Should Use This?

- Software developers
- Programming students
- Engineers doing retrospectives

Anyone curious about developer behavior and cognition

---

## Project Status

Early-stage MVP focused on cognitive data collection.

Planned improvements:

- Session-based timelines
- Thinking map visualization
- Cognitive hotspot detection
- Noise reduction modes
- Git commit context linking

---

## Tech Stack

- TypeScript
- VS Code Extension API
- Node.js
- Local JSON storage

---

## Author

Jatin

If this project interests you, ⭐ star the repository.
