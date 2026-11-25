# Formats and support

mc-fbx-import reads Autodesk FBX with three.js's FBXLoader.

## What is read

- Meshes with normals, texture coordinates, vertex colours, skinning and morph targets; NURBS curves as lines.
- Materials as MeshStandardMaterial (roughness from shininess), or as loaded with `materialType: 'original'`.
- Textures embedded in the file, or external ones given with it, found by file name wherever the file says they are.
- Cameras, lights, and animation clips, returned for a THREE.AnimationMixer.
- The file's up axis (Z-up files are turned Y up) and unit (UnitScaleFactor, in centimetres), scaled to metres.

## Orientation and units

The model is Y up and in metres: FBX units are centimetres times the file's UnitScaleFactor.

## Limits

FBX files older than 7.0 (2011) are refused.
