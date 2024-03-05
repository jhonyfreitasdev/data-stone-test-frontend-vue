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
                            <li v-if="this.productList.length === 0">Nenhum produto cadastrado</li>
                            <li v-for="product in productList">
                                <input type="checkbox" v-model="selectedProduct" :value="product" :id="product.name">
                                {{ product.name }}
                            </li>
                        </ul>
                    </div>

                    <div class="associated-products">
                        <p>Lista de produtos associados:</p>
                        <p v-if="customer.associatedProducts.length === 0">Nenhum produto associado</p>
                        <ul class="list">
                            <li class="item" v-for="product in customer.associatedProducts" :key="product.name">
                                <p>Nome: {{ product.name }}</p>
                                <p>Ativo: {{ product.activatedStatus ? 'Sim' : 'Não' }}</p>
                                <button class="associated-button" @click="removeAssociatedProduct(product, customer)"
                                    type="button">
                                    Remover</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="content edit" v-else-if="fieldInEditing === customer.document">
                    <form @submit.prevent="saveField(customer)" class="customer-info">
                        <div class="input-container">
                            <label for="name-edit">Nome:</label>
                            <input v-model="editedCustomer.name" id="name-edit" name="name" type="text" required />
                        </div>
                        <div class="input-container">
                            <label for="document-edit">Documento:</label>
                            <input v-model="editedCustomer.document" @change="onChangeDocument" id="document-edit"
                                name="document" type="text" required />
                        </div>
                        <div class="input-container">
                            <label for="tel-edit">Telefone:</label>
                            <input v-model="editedCustomer.tel" id="tel-edit" name="tel" type="text" required />
                        </div>
                        <div class="input-container">
                            <label for="mail-edit">Email:</label>
                            <input v-model="editedCustomer.mail" id="mail-edit" name="mail" type="text" required />
                        </div>
                        <div class="input-container">
                            <button @click="() => this.clearFields()" class="btn-cancel" type="button"> Cancelar
                            </button>
                            <input class="btn-save" type="submit" value="Salvar" />
                        </div>
                    </form>
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
        cancelEditing() {
            this.fieldInEditing = '';
        },
        clearFields() {
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
                return item.document === customer.document
                    ? { ...this.editedCustomer, activatedStatus: customer.activatedStatus, associatedProducts: customer.associatedProducts }
                    : item;
            });

            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
            this.cancelEditing();
            this.clearFields();
        },
        associateProduct(customer) {
            const foundProduct = customer.associatedProducts.find(product => this.selectedProduct.some(item => item.name === product.name));

            if (foundProduct) {
                window.alert('Produto já associado');
                this.selectedProduct = [];
                return;
            }
            const newCustomerList = this.customerList.map(item => {
                return item.document === customer.document ? {
                    ...item,
                    associatedProducts: [...item.associatedProducts, ...this.selectedProduct]
                } : item
            });

            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
            this.selectedProduct = [];
            this.activatedProductList = '';
        },
        removeAssociatedProduct(product, customer) {
            const filteredProducts = customer.associatedProducts.filter(item => item.name !== product.name)

            const newCustomerList = this.customerList.map(copyCustomer => {
                return copyCustomer.name === customer.name ? { ...copyCustomer, associatedProducts: filteredProducts } : copyCustomer;
            })

            this.customerList = newCustomerList
            this.$store.commit('updateCustomerList', newCustomerList);
        },
        changeStatus(customer) {
            const newCustomerList = this.customerList.map(item => {
                return customer.name === item.name ? {...customer, activatedStatus: !customer.activatedStatus} : item;
            });
            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
        },
        onChangeDocument() {
            const foundCustomer = this.$store.state.customers.find(item => item.document === this.editedCustomer.document)
            if (foundCustomer !== undefined) {
                window.alert('Cliente já cadastrado')
                this.clearFields();
            };
        }
    }
}
</script>

<style lang="sass" scoped>
@import'./CustomerList.sass'
</style>