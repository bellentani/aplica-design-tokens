# Update Bundles Guide – Upgrading Projects Based on This Structure

**Purpose**: Explain how to create **update bundles** so that projects that **are based on** (fork, mirror, or consume) this Theme Engine can upgrade between versions **without breaking** their structure. The bundle is **step-based** and **scope-aware**: you choose whether to update **dynamic-themes**, **transformers**, or **both**. You do **not** always need to touch both.

**Audience**: Maintainers creating bundles for other teams; developers or IA agents applying an upgrade in a dependent project.

**Related docs**:
- **`RELEASE_FILES.md`** – Which files changed per version (paths; use this to build the file list).
- **`CHANGELOG.md`** – What changed per version (narrative; use this for the change summary).
- **`AGENT_GUIDE.md`** – Task "Help update a fork or team from version X to Y"; build/test commands.

---

## 1. Scope: dynamic-themes vs transformers

**Always decide per bundle (or per version):** are we updating **dynamic-themes**, **transformers**, or **both**? Not every release touches both areas. Asking this at each step avoids unnecessary changes and reduces risk.

| Scope | What it covers | Typical paths | Regeneration / build |
|-------|----------------|---------------|----------------------|
| **dynamic-themes** | Theme generation: schemas, theme configs, scripts that produce `data/brand`, `data/mode`, `data/surface`, `data/semantic`, foundation defaults. | `dynamic-themes/` (configs, scripts, schemas, reference, templates), `config/themes.config.json`, theme-related `config/`, docs like `DYNAMIC_THEMES.md`, `THEME_CONFIG_REFERENCE.md`, override specs. | `npm run build:themes` (or at least `themes:generate` + `sync:architecture` + `foundations:generate` as needed). |
| **transformers** | Build pipeline: Style Dictionary config, transforms, CSS generation, output to `dist/`. | `transformers/` (build.mjs, base-config.mjs, generate-css-classes.mjs, schemas), `config/` that affects build (e.g. dimension, foundation styles), docs like `SIMPLIFIED-ARCHITECTURE.md`, `TESTING.md`. | `npm run build`, `npm run test` (or `test:quick`). |

**Shared / both**: Some files are used by both (e.g. `config/themes.config.json`, `package.json`, root `README.MD`, `CHANGELOG.md`, `docs/context/*`). When in doubt, list them under "both" or under the scope that the version actually changed (e.g. if only theme config changed, treat as dynamic-themes).

When **creating** a bundle: for each version, tag whether it is **dynamic-themes**, **transformers**, or **both**, and filter the file list by the scope the consumer chose.  
When **applying** a bundle: **always ask** (or read from the bundle): "Update dynamic-themes? Update transformers? Both?" Then apply only the files and steps for the chosen scope(s).

---

## 2. What is an update bundle?

An **update bundle** is a portable description of everything that changed between two versions of this repo, so another project can:

- **Compare** its current state to the target version.
- **Apply** only the relevant changes (files + config + scripts + data regeneration).
- **Avoid breakage** by following a defined order and checking "Configurations that MUST be updated" and "Scripts changed" per version.

A bundle does **not** have to be a single file or archive; it can be:

- A **checklist** (version range + full file list + per-version summary + apply steps), or
- A **markdown/JSON artifact** with the same information, or
- A **patch set** (e.g. `git format-patch`) plus a short apply guide.

What matters is that the consumer has: **(1)** the complete list of modified paths, **(2)** what changed in each version (configs, scripts, data), **(3)** the order and steps to apply without breaking, and **(4)** a clear **scope** (dynamic-themes / transformers / both) so they are **always asked** and only apply what they need.

---

## 3. Sources of truth for building a bundle

| Source | Use it for |
|--------|------------|
| **RELEASE_FILES.md** | **File list**: for each version in your range, collect every path from "Files modified" and "Complete list of files modified" (if present). Merge into one set (no duplicates). |
| **RELEASE_FILES.md** | **Breaking / config**: for each version, read "Configurations that MUST be updated" and "Scripts changed (summary for other projects)". These tell you what must be re-applied or run. |
| **CHANGELOG.md** | **Narrative**: "What changed" per version (features, fixes). Use this to write a short summary for the bundle. |

**Version range**: Decide **from** (e.g. `v2.13.8`) **to** (e.g. `v2.15.1`). The bundle covers all versions **from (current + 1)** through **target**.

---

## 4. Creating an update bundle (step-by-step)

Do these steps **in order**. At the scope step, **always** decide (and document) whether the bundle or each version is **dynamic-themes**, **transformers**, or **both**.

### Step 1: Define the version range

- **Current version** in the dependent project (e.g. `2.13.8`).
- **Target version** (e.g. `2.15.1`).
- **Versions in between**: list every release in RELEASE_FILES from `current+1` to `target`.

### Step 2: Decide scope per version (mandatory)

For **each** version in the range, ask and record:

- **Is this version relevant for dynamic-themes only, transformers only, or both?**

Use RELEASE_FILES: if only paths under `dynamic-themes/`, theme configs, or theme docs changed → **dynamic-themes**. If only paths under `transformers/` or build-related config/docs changed → **transformers**. If both areas have changes → **both**.

You do **not** always need to update both. Document the scope so the consumer can choose: "I only want dynamic-themes for this bundle" or "only transformers" or "both".

### Step 3: Build the complete file list (then split by scope)

1. Open **RELEASE_FILES.md** and collect every path from "Files modified" / "Complete list" for each version in the range. Merge into one set (no duplicates).
2. **Split the list by scope** so the bundle can be applied partially:
   - **Files for dynamic-themes**: paths under `dynamic-themes/`, `config/themes.config.json`, theme configs under `config/` or `dynamic-themes/configs/`, theme-related docs (e.g. `docs/override-interface-active.md`, `docs/context/DYNAMIC_THEMES.md`, `THEME_CONFIG_REFERENCE.md`). Add root/docs only if the version changed them for theme-related reasons.
   - **Files for transformers**: paths under `transformers/`, build-related `config/` (e.g. dimension, foundation styles), build/docs (e.g. `SIMPLIFIED-ARCHITECTURE.md`, `TESTING.md`). Add root/docs only if the version changed them for build-related reasons.
   - **Files for both**: shared roots (`package.json`, `CHANGELOG.md`, `README.MD`, `AI_CONTEXT.md`, `docs/context/INDEX.md`, `RELEASE_FILES.md`, `SUMMARY.md`, `WORK_PLAN.md`) when the version touches both areas or when you want the consumer to always apply them.

Publish in the bundle: **File list (dynamic-themes)**, **File list (transformers)**, and optionally **File list (both / shared)**.

### Step 4: Build the change summary (per version, with scope)

For **each** version in the range:

1. **Scope**: dynamic-themes / transformers / both (from Step 2).
2. **One-line summary**: Copy the first line under the version heading in RELEASE_FILES.
3. **Configurations that MUST be updated**: If present, copy verbatim; if "None", say so.
4. **Scripts changed**: If there is a "Scripts changed" table or paragraph, include it or a short summary; note whether it’s in `dynamic-themes/scripts` or `transformers/`.
5. **Data regeneration**: Note if the version requires `sync:architecture`, `build:themes`, or `dimension:generate` (→ dynamic-themes) or only `npm run build` / tests (→ transformers).

### Step 5: Write the apply steps (for the consumer, by scope)

Write **separate apply instructions** depending on what the consumer chose. **Always ask at the start**: "Update dynamic-themes? Update transformers? Both?"

- **If dynamic-themes only**  
  1. Back up / branch.  
  2. Apply only **files for dynamic-themes** (and shared/both if you included them).  
  3. Resolve "Configurations that MUST be updated" for versions that are in scope.  
  4. Regenerate theme data: `npm run build:themes` (or minimal: `themes:generate` + `sync:architecture` + `foundations:generate` as needed).  
  5. Optionally run `npm run build` to refresh `dist/` from the new data.  
  6. Update version/docs if desired.

- **If transformers only**  
  1. Back up / branch.  
  2. Apply only **files for transformers** (and shared/both if included).  
  3. Resolve "Configurations that MUST be updated" for versions that are in scope.  
  4. Run `npm run build` and `npm run test` (or `test:quick`).  
  5. Update version/docs if desired.

- **If both**  
  1. Back up / branch.  
  2. Apply **config** files first (shared + dynamic-themes + transformers).  
  3. Apply **schemas and scripts** (dynamic-themes then transformers, or together).  
  4. Regenerate data: `npm run build:themes`.  
  5. Then run `npm run build` and `npm run test`.  
  6. Update version and docs.

### Step 6: Bundle artifact (suggested format)

Ship the bundle as a single markdown file that includes **scope** and **split file lists**:

```markdown
# Update bundle: v<current> → v<target>

## Scope (always ask when applying)
- Update **dynamic-themes**? (yes/no)
- Update **transformers**? (yes/no)
- Apply **both** only if both are needed.

## Version range
- From: v<current>
- To:   v<target>
- Versions included: <list>

## File list (dynamic-themes only)
<paths, one per line>

## File list (transformers only)
<paths, one per line>

## File list (shared / both)
<paths, one per line>

## Per-version summary (with scope)
### [X.Y.Z] — Scope: dynamic-themes | transformers | both
- Summary: <one line>
- Configurations that MUST be updated: <yes/none + details>
- Scripts changed: <short summary or table>
- Data/build: <e.g. run build:themes vs run build + test>

## Apply steps (consumer)
1. Choose scope: dynamic-themes only / transformers only / both.
2. Apply only the file lists for the chosen scope(s) (+ shared).
3. Follow "Apply steps" in UPDATE_BUNDLES_GUIDE.md for that scope (dynamic-themes only / transformers only / both).
4. Regenerate and test as described there.
```

---

## 5. Applying an update bundle in a dependent project (step-by-step)

When **you** are the consumer, follow these steps. **Always answer the scope question first**; you do not have to update both dynamic-themes and transformers.

### Step 1: Get the bundle and choose scope

- Get the bundle (file list + per-version summary + apply steps). If you don’t have one, build it using section 4 from RELEASE_FILES and CHANGELOG.
- **Always ask (or read from the bundle):**  
  **Update dynamic-themes?** (yes/no)  
  **Update transformers?** (yes/no)  
  Apply only the file lists and steps for the scope(s) you chose. **Do not** apply the other area’s files unless you chose "both".  
  **IA agents:** When helping the user apply an update bundle, ask this scope question at the start of the workflow; do not assume both areas must be updated.

### Step 2: Compare

- For each path in the **relevant** file list(s) (dynamic-themes and/or transformers and/or shared), diff or compare with your project.
- Map paths if your layout differs (e.g. theme engine in a subfolder).

### Step 3: Apply in order (by scope)

- **Dynamic-themes only:** Apply config → theme schemas/scripts → run `npm run build:themes` (or minimal theme pipeline). Then optionally `npm run build`. Resolve "Configurations that MUST be updated" for versions in scope.
- **Transformers only:** Apply config → transformers scripts/schemas → run `npm run build` and `npm run test`. Resolve "Configurations that MUST be updated" for versions in scope.
- **Both:** Config first → dynamic-themes schemas/scripts → transformers scripts → `npm run build:themes` → `npm run build` and `npm run test`. Resolve all "Configurations that MUST be updated".

### Step 4: Regenerate and verify

- After changing scripts or schema in **dynamic-themes**, run at least the minimal theme pipeline (`sync:architecture` or full `build:themes`) so `data/` is consistent.
- After changing **transformers**, run `npm run build` and `npm run test` (or `test:quick`). See AGENT_GUIDE and transformers/TESTING.md.

---

## 6. Avoiding breakage – checklist for bundle creators

When writing the bundle (or the per-version summary), always include:

- [ ] **Scope per version**: Tag each version as dynamic-themes / transformers / both so the consumer can choose.
- [ ] **Every** path from RELEASE_FILES for the version range, **split** into dynamic-themes / transformers / shared (both).
- [ ] **Always ask** in the bundle: "Update dynamic-themes? Update transformers? Both?"
- [ ] For each version: **"Configurations that MUST be updated"** – if present, the consumer must act on it for the relevant scope.
- [ ] **Scripts changed**: note which area (dynamic-themes vs transformers); consumer updates only the scope they chose.
- [ ] **Data regeneration**: dynamic-themes → build:themes/sync; transformers → build + test. Document in apply steps by scope.
- [ ] **Order**: config first, then scripts/schema by scope, then regenerate/build/test. Document this in the apply steps.

---

## 7. Summary

| Goal | Action |
|------|--------|
| **Create a bundle** | Steps: version range → **decide scope per version** → build file list → **split by dynamic-themes / transformers / shared** → per-version summary with scope → apply steps **by scope**. Always ask: update dynamic-themes? transformers? both? |
| **Apply a bundle** | **Choose scope first** (dynamic-themes only / transformers only / both). Apply only the file lists and steps for that scope; then regenerate and test as in section 5. |
| **Avoid breakage** | Do not apply the other area’s files if you only need one. Follow "Configurations that MUST be updated" and "Scripts changed" for the chosen scope; regenerate data/build as in the apply steps. |

For a quick reference on collecting the file list and applying an upgrade, see the top of **RELEASE_FILES.md** ("Upgrading another project"). For **scope** and **step-by-step** bundle creation and application, use this guide.
