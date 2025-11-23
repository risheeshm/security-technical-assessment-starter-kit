export declare class GraphqlController {
    getSchema(): {
        __schema: {
            types: {
                name: string;
                fields: {
                    name: string;
                }[];
            }[];
        };
    };
    query(query: string): {
        data: string;
    };
}
