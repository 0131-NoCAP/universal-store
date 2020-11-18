import { createContext } from 'react';

const CartContext = createContext({
    items: [],
    setCart: (newItem) => {}
});

export { CartContext }
