import * as pb from '../generated/api_pb';
import * as api from '../generated/api_grpc_pb';
import {credentials} from 'grpc';
import 'node';

const BACKEND_HOST = process.env['BACKEND_HOST'] || "localhost:8081";
const client = new api.BackendClient(BACKEND_HOST, credentials.createInsecure());
