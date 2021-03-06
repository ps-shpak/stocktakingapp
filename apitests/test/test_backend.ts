import * as pb from '../api/api_pb';
import * as grpcpb from '../api/api_grpc_pb';
import { rollout, RollbackFunction } from 'trolling';
import * as grpc from 'grpc';
import {assert} from 'chai';
import 'mocha';

class Client {
    private backend: grpcpb.BackendClient;

    constructor() {
        const backendEndpoint = process.env['BACKEND_HOST'] || "localhost:8081";
        this.backend = new grpcpb.BackendClient(backendEndpoint, grpc.credentials.createInsecure());
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

    public transferItems(request: pb.TransferItemsRequest): Promise<pb.TransferItemsResponse> {
        return this.invoke(request, this.backend.transferItems);
    }

    public disposeItems(request: pb.DisposeItemsRequest): Promise<pb.DisposeItemsResponse> {
        return this.invoke(request, this.backend.disposeItems);
    }

    public listOwners(request: pb.ListOwnersRequest): Promise<pb.ListOwnersResponse> {
        return this.invoke(request, this.backend.listOwners)
    }

    public saveOwner(request: pb.SaveOwnerRequest): Promise<pb.SaveOwnerResponse> {
        return this.invoke(request, this.backend.saveOwner)
    }

    public loadOwner(request: pb.LoadOwnerRequest): Promise<pb.LoadOwnerResponse> {
        return this.invoke(request, this.backend.loadOwner)
    }

    public deleteOwner(request: pb.DeleteOwnerRequest): Promise<pb.DeleteOwnerResponse> {
        return this.invoke(request, this.backend.deleteOwner)
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
    it("can save and find owner", rollout(async (rollback: RollbackFunction) => {
        const client = new Client();
        let ownerId = '';
        {
            const junior = new pb.AddOwnersRequest.Owner();
            junior.setName('Junior Truth');
            junior.setEmail('junior@example.com');

            const req = new pb.AddOwnersRequest();
            req.addOwners(junior);
            const res = await client.addOwners(req);
    
            const owners = res.getOwnersList();
            assert.equal(owners.length, 1);
            ownerId = owners[0].getId();
            assert.notEqual(ownerId, '');
        }
        rollback(async () => {
            const req = new pb.DeleteOwnerRequest();
            req.setId(ownerId);
            await client.deleteOwner(req);
        });
        {
            const res = await client.listOwners(new pb.ListOwnersRequest());
            const owners = res.getResultsList();
            let junior = null;
            for (let owner of owners)
            {
                if (owner.getId() == ownerId)
                {
                    junior = owner;
                    break;
                }
            }
            assert.equal(junior && junior.getName(), 'Junior Truth');
            assert.equal(junior && junior.getEmail(), 'junior@example.com');
            assert.equal(junior && junior.getMayLogin(), false);
        }
    }));

    it("can save and load item with owner", rollout(async (rollback: RollbackFunction) => {
        const itemId = '72c3ffbb-5f12-4791-ae36-335fe8ff45bd';
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
        rollback(async () => {
            const req = new pb.DeleteOwnerRequest();
            req.setId(ownerId);
            await client.deleteOwner(req);
        });
        const spec = new pb.ItemSpec();
        {
            spec.setKind("equipment");
            spec.setCategory("Table");
            spec.setDescription("The old oaken table");
            spec.setPrice(10.2);
            spec.setPlace("Royal Palace");
            spec.setOwnerId(ownerId);
    
            const req = new pb.SaveItemRequest();
            req.setId(itemId);
            req.setSpec(spec);

            const res = await client.saveItem(req);
            assert.equal(res.getId(), itemId);
        }
        rollback(async () => {
            const req = new pb.DisposeItemsRequest();
            req.setIdsList([itemId]);
            await client.disposeItems(req);
        });
        {
            const req = new pb.LoadItemRequest();
            req.setId(itemId);
            const res = await client.loadItem(req);
            const resSpec = res.getSpec();
            assert.equal(resSpec && resSpec.getKind(), spec.getKind());
            assert.equal(resSpec && resSpec.getCategory(), spec.getCategory());
            assert.equal(resSpec && resSpec.getDescription(), spec.getDescription());
            assert.equal(resSpec && resSpec.getPlace(), spec.getPlace());
            assert.equal(resSpec && resSpec.getPrice(), spec.getPrice());
            assert.equal(resSpec && resSpec.getOwnerId(), spec.getOwnerId());
            assert.equal(res.getOwnerName(), 'Donald Ronald');
            assert.equal(res.getDisplayName(), "Table, Royal Palace");
        }
    }));

    it("can transfer ownership", rollout(async (rollback: RollbackFunction) => {
        const itemId = 'f2adb4c2-8c51-4f16-b83e-813a2eed7dcc';
        const client = new Client();
        let ownerIdA = '';
        let ownerIdB = '';
        {
            const donald = new pb.AddOwnersRequest.Owner();
            donald.setName('Donald Ronald');
            donald.setEmail('donald@example.com');
            const anna = new pb.AddOwnersRequest.Owner();
            anna.setName('Anna Bananova');
            anna.setEmail('anna@example.com');
            const req = new pb.AddOwnersRequest();
            req.addOwners(donald);
            req.addOwners(anna);
            const res = await client.addOwners(req);
            const owners = res.getOwnersList();
            assert.equal(owners.length, 2);
            ownerIdA = owners[0].getId();
            ownerIdB = owners[1].getId();
            assert.notEqual(ownerIdA, ownerIdB);
        }
        rollback(async () => {
            const req = new pb.DeleteOwnerRequest();
            req.setId(ownerIdA);
            await client.deleteOwner(req);
            req.setId(ownerIdB);
            await client.deleteOwner(req);
        });
        const spec = new pb.ItemSpec();
        {
            spec.setKind("equipment");
            spec.setOwnerId(ownerIdA);

            const req = new pb.SaveItemRequest();
            req.setId(itemId);
            req.setSpec(spec);

            const res = await client.saveItem(req);
            assert.equal(res.getId(), itemId);
        }
        rollback(async () => {
            const req = new pb.DisposeItemsRequest();
            req.setIdsList([itemId]);
            await client.disposeItems(req);
        });
        {
            const req = new pb.TransferItemsRequest();
            req.setIdsList([itemId]);
            req.setOwnerId(ownerIdB);
            await client.transferItems(req);
        }
        {
            const req = new pb.LoadItemRequest();
            req.setId(itemId);
            const res = await client.loadItem(req);
            const resSpec = res.getSpec();
            assert.equal(resSpec && resSpec.getOwnerId(), ownerIdB);
        }
    }));

    it("can save, load and delete owner", rollout(async (rollback: RollbackFunction) => {
        const client = new Client();
        let ownerId = "";
        {
            const req = new pb.SaveOwnerRequest();
            req.setMayLogin(true);
            req.setName("Peter Better");
            req.setEmail("peter.better@example.com");
            const res = await client.saveOwner(req);
            ownerId = res.getId();
            assert.notEqual(ownerId, "");
        }
        rollback(async () => {
            const req = new pb.DeleteOwnerRequest();
            req.setId(ownerId);
            await client.deleteOwner(req);
        });
        {
            const req = new pb.LoadOwnerRequest();
            req.setId(ownerId);
            const res = await client.loadOwner(req);
            assert.equal(res.getId(), ownerId);
            assert.equal(res.getEmail(), "peter.better@example.com");
            assert.equal(res.getName(), "Peter Better");
            assert.equal(res.getMayLogin(), true);
        }
        {
            const req = new pb.DeleteOwnerRequest();
            req.setId(ownerId);
            await client.deleteOwner(req);
        }
        try
        {
            const req = new pb.LoadOwnerRequest();
            req.setId(ownerId);
            await client.loadOwner(req);
            // API call should throw, so next line is unreachable.
            assert(false);
        }
        catch (err)
        {
            assert.equal(err.code, grpc.status.NOT_FOUND);
        }
    }));

    it("cannot add owners with same email", rollout(async (rollback: RollbackFunction) => {
        const client = new Client();

        try {
            const req = new pb.AddOwnersRequest();
            {
                const owner = new pb.AddOwnersRequest.Owner();
                owner.setName("Peter Better");
                owner.setEmail("peter.better@example.com");
                req.addOwners(owner);
            }
            {
                const owner = new pb.AddOwnersRequest.Owner();
                owner.setName("Wolf Golf");
                owner.setEmail("peter.better@example.com");
                req.addOwners(owner);
            }
            await client.addOwners(req);
            assert(false); // unreachable.
        }
        catch (err) {
            assert.equal(err.code, grpc.status.ALREADY_EXISTS);
        }
    }));

    it("can load disposed item", rollout(async (rollback: RollbackFunction) => {
        const client = new Client();
        let ownerId = '';
        {
            const req = new pb.AddOwnersRequest();
            {
                const owner = new pb.AddOwnersRequest.Owner();
                owner.setName("Peter Better");
                owner.setEmail("peter.better@example.com");
                req.addOwners(owner);
            }
            const res = await client.addOwners(req);
            const owners = res.getOwnersList();
            ownerId = owners[0].getId();
        }
        let itemId = '';
        const spec = new pb.ItemSpec();
        spec.setKind("equipment");
        spec.setOwnerId(ownerId);
        spec.setCategory("Table")
        spec.setPlace("Palace #2");
        spec.setDescription("Just a small table")
        {
            const req = new pb.SaveItemRequest();
            req.setSpec(spec);
            const res = await client.saveItem(req);
            itemId = res.getId();
        }
        {
            const req = new pb.DisposeItemsRequest();
            req.setIdsList([itemId]);
            await client.disposeItems(req);
        }
        {
            const req = new pb.LoadItemRequest();
            req.setId(itemId);
            const item = await client.loadItem(req);
            const reqSpec = item.getSpec();
            assert.isNotNull(reqSpec);
            assert.equal(spec.getKind(), reqSpec && reqSpec.getKind());
            assert.equal(spec.getCategory(), reqSpec && reqSpec.getCategory());
            assert.equal(spec.getDescription(), reqSpec && reqSpec.getDescription());
            assert.equal(spec.getPlace(), reqSpec && reqSpec.getPlace());

            // Owner dropped after dispose
            assert.notEqual(ownerId, reqSpec && reqSpec.getOwnerId());
        }
    }));
});
