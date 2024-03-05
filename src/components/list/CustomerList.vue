<template>
    <div class="list-container">
        <p>Lista de Clientes:</p>

        <ul class="customer-list">
            <li class="item" v-for="customer in customerList" :key="customer.document">
                <div class="content" v-if="fieldInEditing !== customer.document">
                    <div class="customer-info">
                        <p>Nome: {{ customer.name }}</p>
                        <p>Documento: {{ customer.document }}</p>
                        <p>Telefone: {{ customer.tel }}</p>
                        <p>Email: {{ customer.mail }}</p>
                        <p>Ativo: {{ customer.activatedStatus ? 'Sim' : 'Não' }}</p>
                    </div>

                    <div class="button-container">
                        <button @click="editField(customer)" type="button"> Editar </button>
                        <button @click="changeStatus(customer)" type="button"> {{ customer.activatedStatus ?
                'Desativar' : 'Ativar' }} </button>
                        <button @click="removeItem(customer)" type="button"> Remover </button>

                        <button @click="() => this.activatedProductList = customer.name"> Associar </button>
                        <ul class="product-list" v-if="this.activatedProductList === customer.name">
                            <li class="button">
                                <button @click="associateProduct(customer)" type="button"> ✔️ </button>
                                <button @click="() => this.activatedProductList = ''" type="button"> ❌ </button>
                            </li>
                            <li v-for="product in productList">
                                <input type="checkbox" v-model="selectedProduct" :value="product" :id="product.name">
                                {{ product.name }}
                            </li>
                        </ul>
                    </div>

                    <div class="associated-products">
                        <p>Lista de produtos associados:</p>
                        <ul class="list">
                            <li class="item" v-for="product in customer.associatedProducts" :key="product.name">
                                <p>Nome: {{ product.name }}</p>
                                <p>Ativo: {{ product.activatedStatus ? 'Sim' : 'Não' }}</p>
                                <button class="associated-button" @click="removeAssociatedProduct(product, customer)" type="button">
                                    Remover</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="content edit" v-else-if="fieldInEditing === customer.document">
                    <div class="customer-info">
                        <div class="input-container">
                            <label for="name-edit">Nome:</label>
                            <input v-model="editedCustomer.name" id="name-edit" name="name" type="text" />
                        </div>
                        <div class="input-container">
                            <label for="document-edit">Documento:</label>
                            <input v-model="editedCustomer.document" id="document-edit" name="document" type="text" />
                        </div>
                        <div class="input-container">
                            <label for="tel-edit">Telefone:</label>
                            <input v-model="editedCustomer.tel" id="tel-edit" name="tel" type="text" />
                        </div>
                        <div class="input-container">
                            <label for="mail-edit">Email:</label>
                            <input v-model="editedCustomer.mail" id="mail-edit" name="mail" type="text" />
                        </div>
                    </div>
                    <div class="input-container">
                        <button @click="() => this.clearFields()" class="btn-cancel" type="button"> Cancelar </button>
                        <button @click="saveField(customer)" class="btn-save" type="button"> Salvar </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'customer-list',
    data() {
        return {
            customerList: this.$store.state.customers || [],
            productList: this.$store.state.products || [],
            fieldInEditing: '',
            activatedProductList: '',
            selectedProduct: [],
            editedCustomer: {
                name: '',
                document: '',
                tel: '',
                mail: '',
            }
        }
    },
    methods: {
        clearFields() {
            this.fieldInEditing = '';
            this.editedCustomer = {
                name: '',
                document: '',
                tel: '',
                mail: '',
            }
        },
        editField(customer) {
            this.fieldInEditing = customer.document
        },
        removeItem(customer) {
            const newCustomerList = this.customerList.filter(item => item.document !== customer.document);
            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
        },
        saveField(customer) {
            const newCustomerList = this.customerList.map(item => {
                if (item.document === customer.document) {
                    return {
                        name: this.editedCustomer.name,
                        document: this.editedCustomer.document,
                        tel: this.editedCustomer.tel,
                        mail: this.editedCustomer.mail,
                        activatedStatus: customer.activatedStatus,
                        associatedProducts: customer.associatedProducts
                    }
                } else {
                    return item
                }
            });

            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
            this.clearFields();
        },
        associateProduct(customer) {
            const newCustomerList = this.customerList.map(item => {
                if (item.document === customer.document) {
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
            this.selectedProduct = [];
            this.activatedProductList = '';
        },
        removeAssociatedProduct(product, customer) {
            const filteredProducts = customer.associatedProducts.filter(item => item.name !== product.name)

            const newCustomerList = this.customerList.map(copyCustomer => {
                if (copyCustomer.name === customer.name) {
                    return {
                        name: copyCustomer.name,
                        document: copyCustomer.document,
                        tel: copyCustomer.tel,
                        mail: copyCustomer.mail,
                        activatedStatus: copyCustomer.activatedStatus,
                        associatedProducts: filteredProducts
                    }
                } else return copyCustomer
            })

            this.customerList = newCustomerList
            this.$store.commit('updateCustomerList', newCustomerList);
        },
        changeStatus(customer) {
            const newCustomerList = this.customerList.map(item => {
                if (customer.name === item.name) {
                    return {
                        name: customer.name,
                        document: customer.document,
                        tel: customer.tel,
                        mail: customer.mail,
                        activatedStatus: customer.activatedStatus ? false : true,
                        associatedProducts: customer.associatedProducts
                    }
                } else {
                    return item
                }
            });
            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
        }
    }
}
</script>

<style scoped>
.customer-list-container {
    border: 1px solid #1d1c1c8e;
    border-radius: 3px;
    padding: 15px;
}

.customer-list-container p {
    font-size: 17px;
}

.customer-list {
    margin: 15px 0;
}

.customer-list .item {
    background-color: #ececec;
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
}

.customer-list .item .content .customer-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px 18px;
    width: 100%;
}

.customer-list .item .content .customer-info p {
    font-size: 15px;
}

.customer-list .item .content .customer-info label {
    margin-right: 7px;
}

.customer-list .item .content .customer-info input {
    padding: 5px;
    border-radius: 3px;
}

.customer-list .item .content button {
    background-color: #7a7a7a;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px 6px;
    margin: 12px 10px 12px 0;
}

.customer-list .item .content .button-container {
    position: relative;
}

.customer-list .item .content .button-container .product-list {
    position: absolute;
    right: 0;
    top: 12px;
    background-color: lightgray;
    border-radius: 4px;
    padding: 5px;
}

.customer-list .item .content .button-container .product-list .button {
    display: flex;
    justify-content: space-between;
}

.customer-list .item .content .button-container .product-list .button button {
    display: flex;
    align-items: center;
    background-color: #0000;
    width: 20px;
    height: 10px;
}

.customer-list .item .content .associated-products p {
    font-size: 15px;
}

.customer-list .item .content .associated-products .list .item {
    display: flex;
    align-items: center;
    gap: 2px 18px;
    margin: 10px 0;
    padding: 0;
}

.customer-list .item .content .associated-products .list .item .associated-button {
    margin: 0;
}

.customer-list .item .content.edit {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px 18px;
}

.customer-list .item .content.edit label {
    margin-right: 7px;
}

.customer-list .item .content.edit input,
select {
    border: 1px solid #1d1c1c8e;
    border-radius: 3px;
    padding: 3px;
}

.customer-list .item .content.edit .btn-cancel {
    background-color: #e91515;
    margin-right: 10px;
}

.customer-list .item .content.edit .btn-save {
    background-color: #1ce915;
}
</style>