#!/usr/bin/env node

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const entryPath = resolve(currentDir, '../dist/index.js');

await import(entryPath);
