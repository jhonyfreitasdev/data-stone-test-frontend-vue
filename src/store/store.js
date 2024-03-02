import { createStore } from "vuex";

const store = createStore({
    state: {
        customers: [],
        products: [],
        association: []
    },
    mutations: {
        addCustomer(state, customer) {
            state.customers.push(customer);
        },
        addProduct(state, product) {
            state.products.push(product);
        },
        createAssociationList(state, customerProductList) {
            state.association.push(customerProductList);
        }
    }
});

export default store;