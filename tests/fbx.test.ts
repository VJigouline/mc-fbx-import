import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { FbxImportError, loadFbx } from '../src/index.js';
import { allSamples, sample } from './files.js';

describe('FBX', () => {
  it('reads a model with an external texture, in metres', async () => {
    const r = await loadFbx(allSamples(), { main: 'monkey.fbx' });
    expect(r.encoding).toBe('binary');
    expect(r.version).toBeGreaterThanOrEqual(7000);
    expect(r.unitScale).toBeCloseTo(0.01);
    expect(r.missing).toEqual([]);
    expect(r.stats).toMatchObject({ meshes: 1, triangles: 970, textures: 1 });
    const mesh = r.group.getObjectByProperty('type', 'Mesh') as THREE.Mesh;
    expect(mesh.material).toBeInstanceOf(THREE.MeshStandardMaterial);
  });

  it('reports an external texture that is not given', async () => {
    const r = await loadFbx(sample('monkey.fbx'));
    expect(r.missing.length).toBe(1);
  });

  it('reads embedded textures', async () => {
    const r = await loadFbx(sample('monkey_embedded_texture.fbx'));
    expect(r.missing).toEqual([]);
    expect(r.stats.textures).toBe(1);
  });

  it('reads NURBS curves as lines, and morphs', async () => {
    expect((await loadFbx(sample('nurbs.fbx'))).stats.lines).toBeGreaterThan(0);
    const morph = await loadFbx(sample('morph_test.fbx'));
    const mesh = morph.group.getObjectByProperty('type', 'Mesh') as THREE.Mesh;
    expect(mesh.geometry.morphAttributes.position?.length).toBeGreaterThan(0);
  });

  it('reads every sample', async () => {
    for (const f of ['exampleWindow.fbx', 'RotationTest.fbx', 'vCube.fbx']) expect((await loadFbx(sample(f))).stats.meshes, f).toBe(1);
  });

  it('refuses files that are not FBX', async () => {
    await expect(loadFbx({ name: 'a.fbx', data: 'hello' })).rejects.toThrow(FbxImportError);
  });
});
