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
                    <form @submit.prevent="saveField(product)">
                        <div class="input-container">
                            <label for="name-edit">Nome:</label>
                            <input v-model="editName" @change="onChangeName" id="name-edit" name="name" type="text" required/>
                        </div>
                        <div class="input-container">
                            <button @click="() => this.clearFields()" class="btn-cancel" type="button"> Cancelar </button>
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
    name: 'product-list',
    data() {
        return {
            productList: this.$store.state.products || [],
            fieldInEditing: '',
            productStatus: '',
            editName: ''
        }
    },
    methods: {
        clearFields() {
            this.fieldInEditing = '';
            this.editName = '';
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
                        name: this.editName,
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
        },
        onChangeName() {
            this.productList.forEach(item => {
                if (item.name === this.editName) {
                    window.alert('Produto já cadastrado!')
                    this.editName = '';
                }
            });
        }
    }
}
</script>

<style lang="sass">
@import './ProductList.sass'
</style>
import { withScopeId } from 'vue';
