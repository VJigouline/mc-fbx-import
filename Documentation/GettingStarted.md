# Getting started

## Install

```sh
npm install three github:VJigouline/mc-fbx-import
```

## Open a file

`loadFbx` takes the file's contents (`ArrayBuffer`, `Uint8Array` or string), a browser `File`, `{ name, data }`, or an iterable of files for a model in several files. Zip archives among them are opened. It returns a promise of the model.

```ts
import * as THREE from 'three';
import { loadFbx } from 'mc-fbx-import';

const input = document.querySelector<HTMLInputElement>('input[type=file]')!;
input.multiple = true;
input.addEventListener('change', async () => {
  const result = await loadFbx(input.files!);
  scene.add(result.group);
  for (const warning of result.warnings) console.warn(warning);
});
```

A model in several files is given as all of them together, or as a zip. Files it refers to (binary or ASCII, with external textures if it has any) are found by file name, wherever the model says they are, ignoring case and folders; those not given are listed in `missing`.

## What you get

- **`group`:** a `THREE.Group` holding the model, named after the file.
- **`stats`:** counts of what was read.
- **`warnings`:** anything that couldn't be read or was left out.

The model is Y up and in metres: FBX units are centimetres times the file's UnitScaleFactor.

## Options

- **`main`** (default the first .fbx file): The .fbx file to open, if several are given.
- **`materialType`** (default 'standard'): `'standard'` makes MeshStandardMaterial; `'original'` keeps the loader's Phong and Lambert materials.
- **`unitScale`** (default from the file): Metres per FBX unit.

See the [API](API.md) for every field of the result.
