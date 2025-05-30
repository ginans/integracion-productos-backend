// export interface IcredencialAuth {
//   //codigo applicacion multivende
//   code: string;
//   //refreshToken multivende
//   urlApiMultiVende: string;
//   //refreshToken multivende
//   clientIdMultiVende: string;
//   //refreshToken multivende
//   clientSecrectMultivende: string;
//   //flag para bloquear cambias de parametros
//   configIsValidMultivende: boolean;
//   //merchantId multivende
//   merchantId: string;
//   //warehouseId multivende
//   warehouseId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// export interface IsetCredentialAuthMultivende {
//   //codigo applicacion multivende
//   code?: string;
//   //refreshToken multivende
//   urlApiMultiVende?: string;
//   //refreshToken multivende
//   clientIdMultiVende?: string;
//   //refreshToken multivende
//   clientSecrectMultivende?: string;
//   //flag para bloquear cambias de parametros
//   configIsValidMultivende?: boolean;
//   //merchar id proveniente de multivende
//   merchantId?: string;
//   //warehouse id proveniente de multivende
//   warehouseId?: string;
// }
export interface IRequestCredentialAuth {
  code: string;
  client_id: number;
  client_secret: string;
  grant_type: string;
}
export interface IResponseCredentialAuth {
  _id: string;
  status: string;
  OauthClientId: string;
  MerchantId: string;
  MerchantAppId: string;
  CreatedById: string;
  UpdatedById: string;
  OwnerId: string;
  scopes: Scopes;
  expiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  updatedAt: Date;
  createdAt: Date;
  token: string;
}

export interface Scopes {
  'read:products': boolean;
  'write:products': boolean;
  'read:clients': boolean;
  'write:clients': boolean;
  'manage:clients': boolean;
  'read:warehouses': ReadWarehouses;
  'write:warehouses': WriteWarehouses;
  'manage:warehouses': boolean;
  'read:stocks': ReadStocks;
  'write:stocks': WriteStocks;
  'read:prices': ReadPrices;
  'write:prices': WritePrices;
  'read:channels': ReadChannels;
  'read:checkouts': ReadCheckouts;
  'write:checkouts': WriteCheckouts;
  'read:product_links': ReadProductLinks;
  'write:product_links': WriteProductLinks;
  'manage:checkouts': boolean;
  'manage:product_links': boolean;
  'read:couriers': ReadCouriers;
  'write:couriers': WriteCouriers;
}

export interface ReadWarehouses {
  all: boolean;
}

export interface WriteWarehouses {
  all: boolean;
}

export interface ReadStocks {
  all: boolean;
}

export interface WriteStocks {
  all: boolean;
}

export interface ReadPrices {
  all: boolean;
}

export interface WritePrices {
  all: boolean;
}

export interface ReadChannels {
  all: boolean;
}

export interface ReadCheckouts {
  all: boolean;
}

export interface WriteCheckouts {
  all: boolean;
}

export interface ReadProductLinks {
  all: boolean;
}

export interface WriteProductLinks {
  all: boolean;
}

export interface ReadCouriers {
  all: boolean;
}

export interface WriteCouriers {
  all: boolean;
}
