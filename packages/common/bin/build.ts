import { rimrafSync } from 'rimraf';
import { generateProtos } from './generate-protos';
import { spawnSync } from 'child_process'
import { cpSync } from 'fs-extra';

const namespaces = ['protos', 'validators'];

const startBuild = async () => {
  console.log('Starting build...');

  console.log('Preparing build...');
  rimrafSync('dist');
  rimrafSync(namespaces);
  console.log('Build prepared');

  console.log('Compiling TypeScript...');
  spawnSync('npx', ['tsc']);
  console.log('TypeScript compiled');

  await generateProtos();

  console.log('Copying generated files to root...');
  namespaces.forEach(ns => {
    cpSync(`dist/${ns}`, ns, { recursive: true });
  });
  console.log('Files copied');

  console.log('Build complete');
}

startBuild();