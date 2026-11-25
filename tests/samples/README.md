# Autodesk FBX test files

Real Autodesk FBX files that the tests load. They are unchanged copies, taken at commit `1d3772857e` of three.js.

| Files | What they cover | Source and licence |
| --- | --- | --- |
| `nurbs.fbx` | NURBS curves | The three.js repository, [CC0](https://creativecommons.org/publicdomain/zero/1.0/) (public domain). |
| `monkey.fbx` (with `monkey.fbm/`), `monkey_embedded_texture.fbx`, `morph_test.fbx`, `RotationTest.fbx`, `vCube.fbx`, `exampleWindow.fbx`, `white.jpg` | Textures external and embedded, morphs, rotations | The three.js repository (`examples/models/fbx`), under its [MIT licence](https://github.com/mrdoob/three.js/blob/dev/LICENSE); no other licence is stated for them. |

These files keep their own licences. They are test data only, and are not part of the npm package, which includes only `dist`, `Documentation`, `README.md` and `LICENSE`.
