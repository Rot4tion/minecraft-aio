# Minecraft AIO (All in One)

Minecraft AIO is a comprehensive tool designed to support Minecraft players in all aspects, catering to both regular players and server administrators.
This project are based on [mineflayer](https://github.com/PrismarineJS/mineflayer) & [PrismarineJS](https://github.com/PrismarineJS) repository

## Features

- Supports Minecraft 1.8 to 1.21 (1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19, 1.20, and 1.21)

- Stress test

## Roadmap

- [ ] Auto update
- [ ] Full control of bot from UI (move, interact, attack,...)
- [ ] Builder bots from schematic file
- [ ] Import external plugins
- [ ] Develop bot behavior with no code
- [ ] Manager local servers

## Develop

1. Download or clone

```bash
git clone https://github.com/Rot4tion/minecraft-aio.git
```

2. Install and setup

```bash
pnpm install
pnpm db:gen
```

3. Run

```bash
pnpm dev
```

4. Build

```bash
pnpm build:win
```

## Using Library and Framework

- [ElectronJS](https://www.electronjs.org/) - Build cross-platform desktop apps
- [ReactJS](https://react.dev/) - UI
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Typescript](https://www.typescriptlang.org/) - type safe
- [TRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Drizzle](https://drizzle-orm.org/) - DB ORM
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Local DB
