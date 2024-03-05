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
                        <button @click="removeItem(product)" type="button"> Remover </button>
                        <button @click="changeStatus(product)" type="button"> {{ product.activatedStatus ? 'Desativar' : 'Ativar' }} </button>
                    </div>
                </div>

                <div class="content edit" v-else-if="fieldInEditing === product.name">
                    <div class="input-container">
                        <label for="name-edit">Nome:</label>
                        <input v-model="editedProduct.name" id="name-edit" name="name" type="text" />
                    </div>
                    <div class="input-container">
                        <label for="status-edit">Ativo:</label>
                        <select v-model="editedProduct.status" id="status-edit" name="status">
                            <option value="yes"> Sim </option>
                            <option value="no"> Não </option>
                        </select>
                    </div>
                    <div class="input-container">
                        <button @click="cancelEdit" class="btn-cancel" type="button"> Cancelar </button>
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
                name: '',
                status: ''
            }
        }
    },
    methods: {
        editField(product) {
            this.fieldInEditing = product.name
        },
        removeItem(product) {
            const newProductList = this.productList.filter(item => item.name !== product.name);
            this.productList = newProductList;
            this.$store.commit('updateProductList', newProductList);
        },
        cancelEdit() {
            this.fieldInEditing = ''
        },
        saveField(product) {
            const newProductList = this.productList.map(item => {
                if (item.name === product.name) {
                    return {
                        name: this.editedProduct.name,
                        activatedStatus: this.editedProduct.status
                    }
                } else {
                    return item
                }
            });

            this.productList = newProductList;
            this.$store.commit('updateProductList', newProductList);
            this.fieldInEditing = '';
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

<style scoped>
.list-container {
    border: 1px solid #1d1c1c8e;
    border-radius: 3px;
    padding: 15px;
}

.list-container p {
    font-size: 17px;
}

.list {
    margin: 15px 0;
}

.list .item {
    background-color: #ececec;
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
}

.list .item .content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
}

.list .item .content p {
    font-size: 15px;
}

.list .item .content label {
    margin-right: 7px;
}

.list .item .content input {
    padding: 5px;
    border-radius: 3px;
}

.list .item .content button {
    background-color: #7a7a7a;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px 6px;
    margin-right: 10px;
}

.list .item .content.edit label {
    margin-right: 7px;
}

.list .item .content.edit input,
select {
    border: 1px solid #1d1c1c8e;
    border-radius: 3px;
    padding: 3px;
}

.list .item .content.edit .btn-cancel {
    background-color: #e91515;
    margin-right: 10px;
}

.list .item .content.edit .btn-save {
    background-color: #1ce915;
}
</style>