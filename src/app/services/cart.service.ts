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
    // find the item in the cart
    const existingCartItem: CartItem | undefined = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );

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

  removeFromCart(cartItem: CartItem) {
    const filteredCartItems = this.cartItems.filter(tempCartItem => tempCartItem.id !== cartItem.id);
    this.cartItems = filteredCartItems;
    // compute total price and total quantity
    this.computeCartTotals();
  }

  updateCartItemQuantity(
    cartItem: CartItem,
    opreation: 'increment' | 'decrement'
  ) {
    // find the item in the cart
    const existingCartItem: CartItem | undefined = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );

    // check if we have the item in the cart
    if (!existingCartItem) throw new Error('Cart item not found');

    opreation === 'increment'
      ? existingCartItem.quantity++
      : existingCartItem.quantity > 0 && existingCartItem.quantity--;

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
      const tempTotalPriceValue =
        tempCartItem.unitPrice * tempCartItem.quantity;
      console.log(
        `\nname=${tempCartItem.name} quantity=${tempCartItem.quantity} unitPrice=${tempCartItem.unitPrice} subTotal=${tempTotalPriceValue}`
      );
    }
    console.log('---------------------');
    console.log(`quantity=${totalQuantityValue} total=${totalPriceValue}`);
  }
}
