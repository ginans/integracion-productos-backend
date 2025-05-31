export interface CreateProductResponse {
    _id: string;
    synchronizationStatus: string;
    status: string;
    name: string;
    alias: string;
    model: string;
    description: string | null;
    code: string;
    internalCode: string;
    shortDescription: string | null;
    htmlDescription: string | null;
    htmlShortDescription: string | null;
    CreatedById: string;
    UpdatedById: string;
    MerchantId: string;
    updatedAt: string;
    createdAt: string;
    ProductTypeId: string;
    ProductVersions: any[];
}