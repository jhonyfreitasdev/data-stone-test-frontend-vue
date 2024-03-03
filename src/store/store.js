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
        updateCustomerList(state, customer) {
            state.customers = customer
        },
        addProduct(state, product) {
            state.products.push(product);
        },
        updateProductList(state, product) {
            state.products = product
        },
        createAssociationList(state, customerProductList) {
            state.association.push(customerProductList);
        }
    }
});

export default store;