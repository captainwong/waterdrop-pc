# Tools

## create3BigKingKong

Usage: `./tools/create3BigKingKong.sh dir-path [file-name] [no]`

Example:

```bash
./create3BigKingKong.sh ./src/pages/search
# 1. create ./src/pages/search
# 2. create Search.tsx, Search.module.css, index.ts in ./src/pages/search
# 3. export Search to index
# 4. if parent dir has `index.ts`, export `search` to it
```

```bash
./create3BigKingKong.sh ./src/pages/search Search2
# 1. create ./src/pages/search
# 2. create Search2.tsx, Search2.module.css, index.ts in ./src/pages/search
# 3. export Search2 to index
# 4. if parent dir has `index.ts`, export `search` to it
```

```bash
./create3BigKingKong.sh ./src/pages/search Search3 no
# 1. create ./src/pages/search
# 2. create Search3.tsx, Search3.module.css, index.ts in ./src/pages/search
# 3. command has `no` option, will not export anything.
```