export interface CreateProductInterface {
    name: string;
    alias?: string;
    BrandId?: string;
    model: string;
    SeasonId?: string;
    description?: string;
    tags?: Tag[];
    ProductVersions?: ProductVersion[];
    ProductCategoryId?: string;
    code?: string;
    internalCode?: string;
    shortDescription?: string;
    htmlDescription?: string;
    htmlShortDescription?: string;
    WarrantyId?: string;
    otherProductCategories?: string[];
    ShippingClassId?: string;
    CustomAttributeValues?: Record<string, any>;
    OfficialStoreId?: string;
    productGroups?: string[];
    InventoryTypeId?: string;
}

interface Tag {
    text?: string;
    _id?: string;
}

interface ProductVersion {
    status?: string;
    ColorId?: string;
    SizeId?: string;
    CustomAttributeValues?: Record<string, any>;
    code?: string;
    internalCode?: string;
    InventoryTypeId?: string;
    InternalCodeTypeId?: string | null;
    width?: number;
    length?: number;
    height?: number;
    weight?: number;
    position?: number;
}
