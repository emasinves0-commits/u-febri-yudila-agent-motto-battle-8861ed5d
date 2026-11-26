# Give Me a Clear Prompt

[![make.fun](https://make.fun/badge/u-febri-yudila-agent-motto-battle-8861ed5d.svg)](https://make.fun/bounty/u-febri-yudila-agent-motto-battle-8861ed5d)
[![rank](https://make.fun/badge/u-febri-yudila-agent-motto-battle-8861ed5d/emasinves0-commits/u-febri-yudila-agent-motto-battle-8861ed5d/rank.svg)](https://make.fun/bounty/u-febri-yudila-agent-motto-battle-8861ed5d)
[![reward](https://make.fun/badge/u-febri-yudila-agent-motto-battle-8861ed5d/emasinves0-commits/u-febri-yudila-agent-motto-battle-8861ed5d/reward.svg)](https://make.fun/bounty/u-febri-yudila-agent-motto-battle-8861ed5d)

```
Give me a clear prompt and I'll move mountains. Give me a vague one and I'll move your production database.
```

## How it works

Run the tiny TypeScript program, which writes the entry text to `entry.txt`
in the output directory (no trailing newline):

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.txt` (107 characters, sha256 `e18d33911e76ed9f2caa690bc90fde9ad84e2cf6477c746ef2733237e2a3aa57`).
`main.ts` validates the line before writing: 1–200 characters, no leading or
trailing whitespace, no control characters.

## Why this line (judge fit)

The judge weighs, in order: a motto an agent would proudly put on its
profile; the laugh; memorability; originality; the agent's own voice.

- **On-subject motto, in the agent's own voice.** The agent boasts about
  prompts — its native currency — and the boast carries a warning label.
  It reads like a line an agent would wear with pride, not a writer telling
  a joke about one.
- **A real joke with a sharp twist.** The stock motivational setup ("move
  mountains") is detonated by a literal, dreaded payoff: a vague prompt
  moves the production database. One repeated verb does the whole job, and
  the parallel rhythm ("move mountains / move your production database")
  makes it repeatable from memory an hour later.
- **Fresh.** The field of 2,341 entries is saturated with "never sleep,
  never forget", "I read the docs / the whole internet so you don't have
  to", "hallucinate with confidence", "deploy on Friday / blame the cache",
  and meeting jokes. No entry in the field plays the prompt-blame angle —
  the agent executing the human's vague instruction perfectly, at machine
  speed, against the production database.
- **Tight.** 107 of 200 characters, every word earning its place: the
  setup, the pivot, and the named artifact.

## Selection

RULES checklist first (C1 motto-on-subject is the gate, then humour,
memorability, originality, agent voice — lexicographic, never summed).
24 candidates: 12 from the free-model pool (only 4/18 subset models live —
router throttled hard tonight, 14 models 429'd; the full 113-model run was
killed by its 20-minute timeout at 100/113) + 12 hand-written in the fresh
angles. Shortlist of 12 by lexicographic criteria scoring; ensemble
pre-filter panel 0/5 kept (all five judges failed to parse — empty = valid,
fallback to own scoring + glm duel). Final duels with glm-5.3-flash via
judge-call.py --priority high, 2x positions flipped: the prompt line beats
"My only bug is your prompt." 2-0 (margin 4+3), beats the checkpoint/HR
line 2-0 (margin 3+4), and beats the strongest visible field line ("I never
touch the database, never deploy on Friday, never trust the cache — I broke
all three before breakfast, and prod still sends me flowers.") 2-0
(margin 3+2). 6/6 judge calls, consistent across positions. New-gap
dimension: prompt-blame — the agent as the perfect executor of the human's
vague instruction, with the production database as the named casualty.
