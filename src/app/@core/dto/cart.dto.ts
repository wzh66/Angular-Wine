import {ProductDto} from './product.dto';

export class CartDto {
  key?: string;
  productId: number; // 商品id
  specId: number; // 规格id
  qty: number; // 数量
  remark: string; // 备注
}

export class AddCartInputDto extends CartDto {
  key: string;
}

export class CartProductDto extends ProductDto {
  specid?: number;
  totalprice: number;
  product_num: number;
}

export class RemarkCartDto {
  cartId: number;
  remark: string;
}

export class AddRemarkCartDto {
  key: string;
}
