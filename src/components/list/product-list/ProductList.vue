<template>
    <div class="list-container">
        <p>Lista de Produtos:</p>

        <ul class="list">
            <li class="item" v-for="product in productList" :key="product.name">
                <div class="content" v-if="fieldInEditing !== product.name">
                    <p>Nome: {{ product.name }}</p>
                    <p>Ativo: {{ product.activatedStatus ? 'Sim' : 'Não' }}</p>
                    <div>
                        <button @click="editField(product)" type="button"> Editar </button>
                        <button @click="changeStatus(product)" type="button"> {{ product.activatedStatus ? 'Desativar' : 'Ativar' }} </button>
                        <button @click="removeItem(product)" type="button"> Remover </button>
                    </div>
                </div>

                <div class="content edit" v-else-if="fieldInEditing === product.name">
                    <div class="input-container">
                        <label for="name-edit">Nome:</label>
                        <input v-model="editedProduct.name" id="name-edit" name="name" type="text" />
                    </div>
                    <div class="input-container">
                        <button @click="() => this.clearFields()" class="btn-cancel" type="button"> Cancelar </button>
                        <button @click="saveField(product)" class="btn-save" type="button"> Salvar </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'product-list',
    data() {
        return {
            productList: this.$store.state.products || [],
            fieldInEditing: '',
            productStatus: '',
            editedProduct: {
                name: ''
            }
        }
    },
    methods: {
        clearFields() {
            this.fieldInEditing = '';
            this.editedProduct = {
                name: ''
            }
        },
        editField(product) {
            this.fieldInEditing = product.name
        },
        removeItem(product) {
            const newProductList = this.productList.filter(item => item.name !== product.name);
            this.productList = newProductList;
            this.$store.commit('updateProductList', newProductList);
        },
        saveField(product) {
            const newProductList = this.productList.map(item => {
                if (item.name === product.name) {
                    return {
                        name: this.editedProduct.name,
                        activatedStatus: product.activatedStatus
                    }
                } else {
                    return item
                }
            });

            this.productList = newProductList;
            this.$store.commit('updateProductList', newProductList);
            this.clearFields();
        },
        changeStatus(product) {
            const newProductList = this.productList.map(item => {
                if (product.name === item.name) {
                    return {
                        name: product.name,
                        activatedStatus: product.activatedStatus ? false : true
                    }
                } else {
                    return item
                }
            });
            this.productList = newProductList;
            this.$store.commit('updateProductList', newProductList);
        }
    }
}
</script>

<style lang="sass">
@import './ProductList.sass'
</style>