import { ElementSchemaRegistry } from './element_schema_registry';
export declare class DomElementSchemaRegistry implements ElementSchemaRegistry {
    schema: {
        [element: string]: {
            [property: string]: string;
        };
    };
    constructor();
    hasProperty(tagName: string, propName: string): boolean;
    getMappedPropName(propName: string): string;
}
