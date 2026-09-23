# The unscoped `commandagi` npm alias

This repository publishes the unscoped `commandagi` npm alias for `@commandagi/sdk`.
It forwards to the canonical SDK and must not contain a second client implementation.

## Why an unscoped alias exists

The implementation is published as `@commandagi/sdk`. This alias makes
`npm install commandagi` resolve to that same implementation, while keeping the canonical
unscoped project name under CommandAGI ownership.

`@commandagi/*` needs no defending — we own the scope, so nobody else can publish into it. The
exposure is entirely in the flat namespaces:

| registry | what we found |
| --- | --- |
| npm, unscoped | `commandagi` was unclaimed and is now ours. The near-misses turned out to need no defending — see below. |
| PyPI | **Not exposed — nothing to do.** Tried, and PyPI REFUSED: *"This project name is too similar to an existing project."* Because we own `commandagi`, PyPI's own typosquatting check blocks anyone from registering `command-agi`, including us. The registry defends the near-misses better than holding them would. |

PyPI also normalises (PEP 503: case, `_` and `.` all collapse), so a single project already covers
those spellings. Between normalisation and the similarity check, the Python side needs no defensive
registrations at all.

## Both registries defend their own near-misses, and that is better than holding them

The plan was to hold `command-agi` and `cagi` too. **Neither is possible, and neither is needed** —
measured, by trying:

```
command-agi → 403  Package name too similar to existing package commandagi
cagi        → 403  Package name too similar to existing packages cac, case, cli, chai,
                   bigi, clui, hapi, ai, wagmi
```

npm runs a similarity check on every NEW package name. Publishing `commandagi` is what made
`command-agi` unclaimable — **by anyone, including us**. And `cagi` was never claimable by anyone at
all; it is too close to a dozen existing packages.

PyPI behaves the same way: registering a pending publisher for `command-agi` was refused with *"This
project name is too similar to an existing project"*, because we already own `commandagi`.

So the whole defensive-registration exercise collapses to **one** package per registry — the canonical
name — and the registry protects the neighbourhood for free. A name nobody can create is strictly safer
than a name we hold: it needs no renewal, no maintenance, and cannot be lost to an expired account.

**The lesson generalises: publish the canonical name and then TEST the near-miss.** If the registry
rejects it, that is the protection working, and holding it would have been busywork.

## The rule: a held name must be HONEST, not a squat

Publishing empty packages purely to deny a name is squatting, and both registries discourage it. Every
package here therefore does one of two real things:

- **alias** — it depends on the canonical package and re-exports it, so installing the name people
  guess actually works. `commandagi` on npm is this: `npm install commandagi` gets you
  `@commandagi/sdk`.
- **pointer** — it installs, prints nothing, and its README/description say in one line which package
  the reader actually wants. *(None currently exist: the registries' similarity checks made them
  impossible, and therefore unnecessary.)*

## The rule that keeps this from rotting

**A directory here may never grow an implementation.** `sdk/node` was deleted in this repo precisely
because it had become a SECOND Node client — 333 lines duplicating `@commandagi/sdk` under the
unscoped name. An alias that re-exports the one implementation is not a second implementation; the
moment one of these gains logic of its own, it is the same defect returning, and it should be deleted
again rather than maintained.
