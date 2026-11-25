# mc-fbx-import

A Autodesk FBX importer for [three.js](https://threejs.org/), written in TypeScript. It reads binary and ASCII FBX files (FBX 7.0 and later) with their meshes, materials, embedded or external textures, cameras, lights, skinning, morphs and animations. It was made for [SceneEditor](https://github.com/VJigouline/SceneEditor), and works in any three.js application.

```ts
import { loadFbx } from 'mc-fbx-import';

const result = await loadFbx(input.files);   // the .fbx and any external textures
scene.add(result.group);
console.log(result.warnings);       // anything that couldn't be read
```

## What it reads

- Meshes with normals, texture coordinates, vertex colours, skinning and morph targets; NURBS curves as lines.
- Materials as MeshStandardMaterial (roughness from shininess), or as loaded with `materialType: 'original'`.
- Textures embedded in the file, or external ones given with it, found by file name wherever the file says they are.
- Cameras, lights, and animation clips, returned for a THREE.AnimationMixer.
- The file's up axis (Z-up files are turned Y up) and unit (UnitScaleFactor, in centimetres), scaled to metres.

FBX files older than 7.0 (2011) are refused. See [Formats and support](Documentation/Support.md) for the details.

## Install

The package is not on the npm registry. Install it from GitHub:

```sh
npm install github:VJigouline/mc-fbx-import
```

`three` (r160 or later) is a peer dependency. The package builds itself on install.

## Documentation

- [Getting started](Documentation/GettingStarted.md)
- [API](Documentation/API.md)
- [Formats and support](Documentation/Support.md)
- [Using it in SceneEditor](Documentation/SceneEditor.md)

## Development

```sh
npm install
npm test           # unit tests, with Vitest
npm run typecheck
npm run build      # dist/
```

The tests load real Autodesk FBX files, kept in [`tests/samples`](tests/samples/README.md) with their licences. It needs Node.js 22 or later.

## Licence

[MIT](LICENSE)
