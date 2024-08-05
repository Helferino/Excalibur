import { globSync } from 'glob';
import { spawn } from 'child_process';
import { spawnSync } from 'child_process';

export const generateProtos = (): Promise<void> => {
  console.log('Generating protos...');

  spawnSync('mkdir', ['dist/protos']);

  const protos = globSync('src/protos/*.proto');
  const compiler = spawn('grpc_tools_node_protoc', [
    '--js_out=import_style=commonjs,binary:dist/protos',
    '--ts_out=dist/protos',
    '--grpc_out=dist/protos',
    '--proto_path=src/protos',
    ...protos
  ]);

  return new Promise((resolve, reject) => {
    compiler.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    compiler.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    compiler.on('close', (code) => {
      if (code === 0) {
        resolve();
        console.log('Protos compiled successfully');
      } else {
        reject();
        console.error(`Protos compilation failed with code ${code}`);
      }
    });
  });
}