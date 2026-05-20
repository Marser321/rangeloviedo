# Rangel Oviedo Group Header Comparison

Static Vercel prototype to compare two scrollytelling hero sequences for the Rangel Oviedo Group landing page.

## Preview

- `Seq 1`: cinematic interior dolly sequence.
- `Seq 2`: alternate interior movement.

Both variants use the same copy, cards, timing, and interaction logic so the visual sequence is the only major comparison variable.

## Local Run

```bash
python -m http.server 4177
```

Then open:

```text
http://127.0.0.1:4177
```

Deep links:

```text
/#seq01
/#seq02
/?jump=seq01:0.45
/?jump=seq02:0.55
```

## Deploy

This is a static site. Vercel can deploy it directly from the repository root.
