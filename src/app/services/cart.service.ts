import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if we have the item in the cart
    let existingCartItem: CartItem | undefined = undefined;

    // find the item in the cart
    if (this.cartItems.length > 0) {
      for (const tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

    console.log('existingCartItem', existingCartItem);

    const alreadyExistsInCart = existingCartItem != undefined;
    if (alreadyExistsInCart) {
      (existingCartItem as CartItem).quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    // compute total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.unitPrice * tempCartItem.quantity;
      totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Cart Items');
    console.log('---------------------');
    for (const tempCartItem of this.cartItems) {
      const tempTotalPriceValue = tempCartItem.unitPrice * tempCartItem.quantity;
      console.log(`\nname=${tempCartItem.name} quantity=${tempCartItem.quantity} unitPrice=${tempCartItem.unitPrice} subTotal=${tempTotalPriceValue}`);
    }
    console.log('---------------------');
    console.log(`quantity=${totalQuantityValue} total=${totalPriceValue}`);


  }
}
