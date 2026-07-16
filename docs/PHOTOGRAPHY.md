# Photography page

`/photography/` (`_pages/photography.md`) renders a grid of photos/videos driven by `_data/photography.yml`. Asset files live in `assets/img/photography/` and `assets/video/photography/`.

## Content workflow

Photos, videos, and `_data/photography.yml` are managed **exclusively via the GitHub website** (the "Add file" / pencil-edit UI at github.com), never from a local clone — see "Local git setup" below for how that's enforced.

To add a photo:

1. Upload the file to `assets/img/photography/` via github.com's "Add file" UI.
2. Add an entry to `_data/photography.yml`:
   ```yaml
   - image: example.jpg
     alt: Caption text
   ```

To add a video:

1. Upload the `.mp4` file to `assets/video/photography/`.
2. Add an entry:
   ```yaml
   - video: example.mp4
     image: example-poster.jpg # optional poster frame, from assets/img/photography/
     alt: Caption text
   ```
3. Nothing else to do — `.github/workflows/mute-photography-videos.yml` automatically strips the audio track from any video pushed to `assets/video/photography/` (re-muxes with `ffmpeg -c:v copy -an`, no quality loss, no manual step required). The page template also sets `muted` on the `<video>` tag as a second layer of defense.

## Local git setup (per laptop)

These three paths are intentionally excluded from local git tracking of _changes_ (see `.gitignore`), so a laptop-side `git add`/`git commit`/`git push` can never modify or delete them — only edits made via the GitHub website affect them. This is enforced with git's `skip-worktree` bit, which is local-only and must be (re-)applied after cloning the repo fresh on any machine:

```bash
git ls-files assets/img/photography assets/video/photography _data/photography.yml | xargs git update-index --skip-worktree
```

A local hook at `.git/hooks/post-merge` re-applies this automatically after every `git pull`, so files added via the GitHub website get the same protection once pulled. Hooks aren't tracked by git, so **re-create it on any fresh clone**:

```bash
cat > .git/hooks/post-merge <<'EOF'
#!/bin/sh
git ls-files assets/img/photography assets/video/photography _data/photography.yml | xargs -r git update-index --skip-worktree
EOF
chmod +x .git/hooks/post-merge
```

To reverse (resume normal local tracking of these paths):

```bash
git ls-files assets/img/photography assets/video/photography _data/photography.yml | xargs git update-index --no-skip-worktree
```
