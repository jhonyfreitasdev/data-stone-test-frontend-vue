<template>
    <div class="list-container">
        <h2> Consultas </h2>

        <div class='button-container'>
            <button @click="changeList('customer')" type="button" :class="this.selectedList === 'customer' ? 'active' : ''">Lista de clientes</button>
            <button @click="changeList('products')" type="button" :class="this.selectedList === 'products' ? 'active' : ''">Lista de produtos</button>
        </div>

        <div v-if="selectedList === 'customer'">
            <CustomerList />
        </div>

        <div v-else-if="selectedList === 'products'">
            <ProductList />
        </div>
    </div>
</template>

<script>
import CustomerList from '../components/list/customer-list/CustomerList.vue';
import ProductList from '../components/list/product-list/ProductList.vue';

export default {
    name: 'QueryList',
    data() {
        return {
            selectedList: 'customer',
        }
    },
    components: {
        CustomerList,
        ProductList
    },
    methods: {
        changeList(listType) {
            this.selectedList = listType;
        }
    }
}
</script>

<style lang="sass" scoped>
.list-container
    position: relative

    h2
        @media (max-width: 440px)
            font-size: 19px
            top: -36px
        position: absolute
        top: -43px
        background-color: lightgrey
        padding: 5px 10px 0 10px
        border-radius: 5px 5px 0 0

    .button-container button
        background-color: darkgray
        color: #ffffff
        text-shadow: 1px 1px 5px #000000af
        font-size: 16px
        border: none
        box-shadow: 0 0 3px #00000090
        cursor: pointer
        margin: 10px 25px 20px 10px
        padding: 7px 10px
        
    .button-container .active
        background-color: #333333
</style>