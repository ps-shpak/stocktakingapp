import * as pb from '../generated/api_pb';
import * as api from '../generated/api_grpc_pb';
import { rollout, RollbackFunction } from 'trolling';
import * as grpc from 'grpc';
import 'mocha';

class Client {
    private backend: api.BackendClient;

    constructor() {
        const BACKEND_HOST = process.env['BACKEND_HOST'] || "localhost:8081";
        this.backend = new api.BackendClient(BACKEND_HOST, grpc.credentials.createInsecure());
    }

    public saveItem(request: pb.SaveItemRequest) {
        return this.invoke(request, this.backend.saveItem);
    }

    private invoke<Req, Res>(req: Req, method: (req: Req, callback: (error: grpc.ServiceError | null, res: Res) => void) => grpc.ClientUnaryCall): Promise<Res> {
        return new Promise((resolve: Function, reject: Function) => {
            method.call(this.backend, req, (error: grpc.ServiceError | null, res: Res): void => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}

describe("stocktaking backend", () => {
    it("can save item without owner", rollout(async (rollback: RollbackFunction): Promise<void> => {
        const id = '72c3ffbb-5f12-4791-ae36-335fe8ff45bd';

        const spec = new pb.ItemSpec();
        spec.setCategory("Table");
        spec.setDescription("The old oaken table");
        spec.setPrice(10.2);
        spec.setPlace("Royal Palace");

        const client = new Client();
        const req = new pb.SaveItemRequest();
        req.setId(id);
        req.setSpec(spec);

        await client.saveItem(req);
    }));
});
