import { IProduct } from "src/shared/jumpseller/interface/retrieve-all-products.interface";
import { CreateProductInterface } from "src/shared/multivende/interfaces/create-product.interface";

    export const mappedDataToMultivende = (
      product: IProduct,
    ): CreateProductInterface => {
      return {
        name: product.name,
        description: product.description,
        model: product.sku,
        code: product.sku,
        tags: [],
        ProductVersions: [
            product.variants.map((variant) => ({
                code: variant.sku,
                internalCode: variant.sku,
                width: product.width,
                length: product.length,
                height: product.height,
                weight: product.weight,
                position: 1,
                status: product.status,
            }))
        ],
        ProductCategoryId: product.categories[0]?.id?.toString(),
        otherProductCategories: product.categories
          .slice(1)
          .map((cat) => cat.id.toString()),
        alias: product.page_title,
        shortDescription: product.description,
        htmlDescription: product.description,
        htmlShortDescription: product.description,
        internalCode: product.sku,
        CustomAttributeValues: {
          jumpseller_id: product.id,
          price: product.price,
          stock: product.stock,
          barcode: product.barcode,
          brand: product.brand,
          featured: product.featured,
          permalink: product.permalink,
          images: product.images?.map((img) => img.url),
          variants: product.variants,
        },
      };
    };