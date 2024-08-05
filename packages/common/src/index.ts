import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const PROTO_PATH = path.join(__dirname, 'protos', 'email.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const protos = {
  email: grpc.loadPackageDefinition(packageDefinition)
}