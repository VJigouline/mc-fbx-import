import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { countModel, FileManager, ImportFiles, orient, toStandardMaterials, type ImportInput, type ImportStats } from './common.js';

export { ImportFiles, FileManager, toStandardMaterials, countModel } from './common.js';
export type { ImportInput, ImportFile, ImportData, ImportStats } from './common.js';

export interface FbxOptions {
  /** The .fbx file to open, if several are given. By default, the first. */
  main?: string;
  /** standard (the default) turns Phong and Lambert materials into MeshStandardMaterial; original keeps them. */
  materialType?: 'standard' | 'original';
  /** Metres per FBX unit, overriding the file's unit (centimetres times its UnitScaleFactor). */
  unitScale?: number;
}

export interface FbxLoadResult {
  /** The model, in metres and Y up: a group named after the file. */
  group: THREE.Group;
  /** Animation clips, ready for a THREE.AnimationMixer on the model. */
  animations: THREE.AnimationClip[];
  /** binary or ascii. */
  encoding: 'binary' | 'ascii';
  /** The FBX version, such as 7400. */
  version: number;
  /** Metres per FBX unit. */
  unitScale: number;
  /** External textures the model refers to that were not given. */
  missing: string[];
  warnings: string[];
  stats: ImportStats;
}

export class FbxImportError extends Error {
  override name = 'FbxImportError';
}

const BINARY = 'Kaydara FBX Binary  \0';

/** Reads an Autodesk FBX file, binary or ASCII, with its embedded or external textures. */
export async function loadFbx(input: ImportInput, options: FbxOptions = {}): Promise<FbxLoadResult> {
  const files = await ImportFiles.from(input, 'model.fbx');
  const main = files.main(['fbx'], options.main) ?? files.files[0];
  if (!main) throw new FbxImportError('There is no .fbx file to open');
  const bytes = main.bytes;
  const head = new TextDecoder().decode(bytes.subarray(0, 21));
  let encoding: 'binary' | 'ascii';
  let version: number;
  if (head === BINARY) {
    encoding = 'binary';
    version = new DataView(bytes.buffer, bytes.byteOffset).getUint32(23, true);
  } else {
    const text = new TextDecoder().decode(bytes.subarray(0, 4096));
    const m = /FBXVersion:\s*(\d+)/.exec(text) ?? /FBX\s+(\d)\.(\d)/.exec(text);
    if (!m || !/^;\s*FBX/m.test(text)) throw new FbxImportError(`${main.name} is not an FBX file`);
    encoding = 'ascii';
    version = m[2] !== undefined ? Number(m[1]) * 1000 + Number(m[2]) * 100 : Number(m[1]);
  }
  if (version < 7000) throw new FbxImportError(`FBX version ${version} is not supported; FBX 7.0 (2011) and later are`);

  const fm = new FileManager(files);
  const loader = new FBXLoader(fm.manager);
  const data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  let model: THREE.Group;
  try {
    model = loader.parse(data, '');
  } catch (error) {
    throw new FbxImportError(`${main.name} could not be read: ${(error as Error).message}`);
  }
  await fm.done();
  fm.dispose();
  if ((options.materialType ?? 'standard') === 'standard') toStandardMaterials(model);
  const warnings: string[] = [];
  const missing = [...fm.missing];
  if (missing.length) warnings.push(`Textures not found: ${missing.join(', ')}`);
  // FBX units are centimetres times the file's UnitScaleFactor.
  const factor = Number(model.userData.unitScaleFactor ?? 1) || 1;
  const scale = options.unitScale ?? factor * 0.01;
  const name = main.name.replace(/\\/g, '/').split('/').pop()!.replace(/\.fbx$/i, '');
  model.name = name;
  // The loader turns Z-up files to Y up itself.
  const group = orient(model, name, false, scale);
  return { group, animations: model.animations ?? [], encoding, version, unitScale: scale, missing, warnings, stats: countModel(group) };
}
