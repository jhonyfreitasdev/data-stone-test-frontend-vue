import { createStore } from "vuex";

const store = createStore({
    state: {
        clients: [],
        products: []
    }, 
    mutations: {
        addClient(state, client) {
            state.clients.push(client);
        }
    }
});

export default store;