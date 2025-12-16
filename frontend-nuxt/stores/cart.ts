import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as any[]
  }),
  getters: {
    cartCount: (state) => {
      const uniqueProducts = new Set(
        state.cart.map(item => `${item.productId}-${item.presentationId || 'none'}`)
      );
      return uniqueProducts.size;
    },
  },
  actions: {
    initializeCart() {
      if (process.client) {
        try {
          const stored = localStorage.getItem('cart');
          if (stored) {
             this.cart = JSON.parse(stored)?.items || [];
          }
        } catch (e) {
          console.error('Error loading cart', e);
        }
      }
    },
    addToCart(product: any) {
      const presentation = product.selectedPresentation ?? null;

      const newItem = {
        productId: product.id,
        unidad: product.unidad,
        discount: product.discount,
        quantity: product.selectedQuantity,
        unidad_venta: product.unidad_venta,
        name: presentation?.name ?? product.name,
        presentationId: presentation?.id ?? null,
        price: presentation?.price ?? product.price,
        image: presentation?.image ?? product.image,
      };

      const existingItem = this.cart.find(item =>
        item.productId === product.id && (presentation ? item.presentationId === presentation.id : item.presentationId === null)
      );

      existingItem ? (existingItem.quantity += product.selectedQuantity) : this.cart.push(newItem);

      if (process.client) {
        localStorage.setItem('cart', JSON.stringify({ items: this.cart, timestamp: Date.now() }));
      }
    },

    removeFromCart(productId: number, presentationId: number | null) {
      this.cart = this.cart.filter(item => {
        const sameProduct = item.productId === productId;
        const samePresentation = item.presentationId === presentationId;

        return !(sameProduct && (presentationId === null ? item.presentationId === null : samePresentation));
      });

      if (process.client) {
        localStorage.setItem('cart', JSON.stringify({ items: this.cart, timestamp: Date.now() }));
      }
    }
  }
});
