import { createStore } from "vuex";

const store = createStore({
    state: {
        clients: [],
        products: []
    },
    mutations: {
        addClient(state, client) {
            state.clients.push(client);
        },
        addProduct(state, product) {
            state.products.push(product);
        }
    }
});

export default store;