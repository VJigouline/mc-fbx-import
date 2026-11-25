# API

## `loadFbx(input, options?)`

Reads `.fbx`, binary or ASCII, with external textures if it has any and returns a promise of a `FbxLoadResult`.

`input` is the file's contents (`ArrayBuffer`, `Uint8Array` or string), a browser `File`, `{ name, data }`, or an iterable of files for a model in several files. Zip archives among them are opened.

It throws `FbxImportError` for input that isn't Autodesk FBX.

### Options

| Option | Default | Meaning |
| --- | --- | --- |
| `main` | the first .fbx file | The .fbx file to open, if several are given. |
| `materialType` | 'standard' | `'standard'` makes MeshStandardMaterial; `'original'` keeps the loader's Phong and Lambert materials. |
| `unitScale` | from the file | Metres per FBX unit. |

### `FbxLoadResult`

| Field | Type | Meaning |
| --- | --- | --- |
| `group` | `THREE.Group` | The model. |
| `animations` | `THREE.AnimationClip[]` | Animation clips. |
| `encoding` | `'binary' \| 'ascii'` | How the file is written. |
| `version` | `number` | The FBX version, such as 7400. |
| `unitScale` | `number` | Metres per FBX unit. |
| `missing` | `string[]` | External textures that were not given. |
| `warnings` | `string[]` | Problems that didn't stop the import. |
| `stats` | object | Counts of meshes, triangles and the like. |

See the package's `index.d.ts` for every exported type and helper.
