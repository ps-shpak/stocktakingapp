import * as pb from '../generated/api_pb';
import * as api from '../generated/api_grpc_pb';
import { rollout, RollbackFunction } from 'trolling';
import * as grpc from 'grpc';
import {assert} from 'chai';
import 'mocha';

class Client {
    private backend: api.BackendClient;

    constructor() {
        const BACKEND_HOST = process.env['BACKEND_HOST'] || "localhost:8081";
        this.backend = new api.BackendClient(BACKEND_HOST, grpc.credentials.createInsecure());
    }

    public saveItem(request: pb.SaveItemRequest): Promise<pb.SaveItemResponse> {
        return this.invoke(request, this.backend.saveItem);
    }

    public loadItem(request: pb.LoadItemRequest): Promise<pb.LoadItemResponse> {
        return this.invoke(request, this.backend.loadItem);
    }

    public addOwners(request: pb.AddOwnersRequest): Promise<pb.AddOwnersResponse> {
        return this.invoke(request, this.backend.addOwners);
    }

    public listOwners(request: pb.ListOwnersRequest): Promise<pb.ListOwnersResponse> {
        return this.invoke(request, this.backend.listOwners)
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
    it("can save owner", rollout(async (rollback: RollbackFunction) => {
        const client = new Client();

        const owner = new pb.AddOwnersRequest.Owner();
        owner.setName('Junior Truth');
        owner.setEmail('junior@example.com');
    
        const req = new pb.AddOwnersRequest();
        req.addOwners(owner);
        const res = await client.addOwners(req);

        const owners = res.getOwnersList();
        assert.equal(owners.length, 1);
        const id = owners[0].getId();
        assert.notEqual(id, '');
    }));

    it("can save item without owner", rollout(async (rollback: RollbackFunction) => {
        const itemID = '72c3ffbb-5f12-4791-ae36-335fe8ff45bd';

        const client = new Client();

        let ownerId = '';
        {
            const owner = new pb.AddOwnersRequest.Owner();
            owner.setName('Donald Ronald');
            owner.setEmail('donald@example.com');
            const req = new pb.AddOwnersRequest();
            req.addOwners(owner);
            const res = await client.addOwners(req);
            const owners = res.getOwnersList();
            assert.equal(owners.length, 1);
            ownerId = owners[0].getId();
        }

        const spec = new pb.ItemSpec();
        spec.setCategory("Table");
        spec.setDescription("The old oaken table");
        spec.setPrice(10.2);
        spec.setPlace("Royal Palace");
        spec.setOwnerId(ownerId);

        const req = new pb.SaveItemRequest();
        req.setId(itemID);
        req.setSpec(spec);

        await client.saveItem(req);
    }));
});
