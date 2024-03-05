<template>
    <div class="form-container">
        <h2> Associação de produtos </h2>

        <form @submit.prevent="submitForm">
            <div class="input-container autocomplete-container">
                <label for="names">Selecione um cliente para associar:</label>
                <input v-model="selectedName" @input="onChangeInput" type="text" name="name" id="names">
                <ul class="autocomplete-list">
                    <li v-for="customer in autocompleteList" @click="selectCustomer(customer)" :key="customer.document">
                        {{ customer.name }}
                    </li>
                </ul>
            </div>

            <div class="input-container">
                <label for="names"> Produtos cadastrados: </label>
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
            if ( customer.name === 'Usuário não encontrado' ) {
                this.selectedName = '';
                this.autocompleteList = [];
            } else{
                this.selectedName = customer.name;
                this.autocompleteList = [];
            }
        },
        submitForm() {
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
            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
            this.selectedName = '';
            this.selectedProduct = [];
        }
    }
}
</script>

<style scoped>
.form-container {
    position: relative;
}

.form-container h2 {
    position: absolute;
    top: -43px;
    background-color: lightgrey;
    padding: 5px 10px 0 10px;
    border-radius: 5px 5px 0 0;
}

.form-container form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #1d1c1c8e;
    border-radius: 4px;
    padding: 25px;
}

.form-container form .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;
    width: 50%;
}

.form-container form .input-container input {
    border: 1px solid #1d1c1c8e;
    border-radius: 4px;
    padding: 6px;
    z-index: 1;
}

.form-container form .input-container .btn-submit {
    background-color: darkgray;
    color: #ffffff;
    text-shadow: 1px 1px 5px #000000aa;
    font-size: 18px;
    border: none;
    box-shadow: 0 0 3px #00000090;
    cursor: pointer;
    margin: 15px auto 0 auto;
    padding: 10px;
}

.form-container form .input-container.autocomplete-container {
    position: relative;
}

.form-container form .input-container.autocomplete-container .autocomplete-list {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    background-color: #f4f4f4;
    border-radius: 4px;
    width: 100%;
}

.form-container form .input-container.autocomplete-container .autocomplete-list li {
    font-size: 14px;
    margin: 8px;
    cursor: pointer;
}
</style>