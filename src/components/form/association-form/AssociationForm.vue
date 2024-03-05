<template>
    <div class="form-container">
        <h2> Associação de produtos </h2>

        <form @submit.prevent="submitForm">
            <div class="input-container autocomplete-container">
                <label for="names">Selecione um cliente para associar:</label>
                <input v-model="selectedName" @input="onChangeInput" type="text" name="name" id="names" required>
                <ul class="autocomplete-list">
                    <li v-for="customer in autocompleteList" @click="selectCustomer(customer)" :key="customer.document">
                        {{ customer.name }}
                    </li>
                </ul>
            </div>

            <div class="input-container">
                <label for="names"> Produtos cadastrados: </label>
                <p v-if="this.productList.length === 0">Não possui produtos cadastrado</p>
                <div v-for="product in productList" :key="product.name">
                    <input type="checkbox" v-model="selectedProduct" :value="product" :id="product.name">
                    {{ product.name }}
                </div>
            </div>


            <div class="input-container">
                <input type="submit" class="btn-submit" value="Associar">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'association-form',
    data() {
        return {
            customerList: this.$store.state.customers || [],
            productList: this.$store.state.products || [],
            selectedName: '',
            autocompleteList: [],
            selectedProduct: []
        }
    },
    methods: {
        onChangeInput() {
            const inputValue = this.selectedName.toLowerCase();
            const customerList = this.$store.state.customers;
            const filteredNames = customerList.filter(customer => customer.name.toLowerCase().startsWith(inputValue));

            inputValue !== '' ? this.autocompleteList = filteredNames : this.autocompleteList = [];

            if (filteredNames.length === 0) this.autocompleteList = [{ name: 'Usuário não encontrado' }];
        },
        selectCustomer(customer) {
            if (customer.name === 'Usuário não encontrado') {
                this.selectedName = '';
                this.autocompleteList = [];
            } else {
                this.selectedName = customer.name;
                this.autocompleteList = [];
            }
        },
        submitForm() {
            if (this.selectedProduct.length !== 0) {
                const newCustomerList = this.customerList.map(item => {
                    if (item.name === this.selectedName) {
                        return {
                            name: item.name,
                            document: item.document,
                            tel: item.tel,
                            mail: item.mail,
                            activatedStatus: item.activatedStatus,
                            associatedProducts: [
                                ...item.associatedProducts,
                                ...this.selectedProduct
                            ]
                        }
                    } else {
                        return item
                    }
                });

                window.alert('Produto associado com sucesso!');
                this.customerList = newCustomerList;
                this.$store.commit('updateCustomerList', newCustomerList);
                this.selectedName = '';
                this.selectedProduct = [];

            } else window.alert('Escolha pelo menos um produto para associar!');
        }
    }
}
</script>

<style lang="sass">
@import './AssociationForm.sass'
</style>