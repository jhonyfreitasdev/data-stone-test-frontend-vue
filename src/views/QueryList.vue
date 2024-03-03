<template>
    <div class="list-container">
        <h2> Consultas </h2>

        <div class='button-container'>
            <button @click="changeList" type="button" id="customer">Lista de clientes</button>
            <button @click="changeList" type="button" id="products">Lista de produtos</button>
        </div>

        <div v-if="selectedList === 'customer'" class="customer-list">
            <p>Lista de Clientes:</p>

            <ul class="list">
                <li class="item" v-for="customer in customerList" :key="customer.document">

                </li>
            </ul>
        </div>

        <div v-else-if="selectedList === 'products'" class="product-list">
            <p>Lista de Produtos:</p>

            <ul class="list">
                <li class="item" v-for="product in productList" :key="product.name">
                    <div class="content" v-if="fieldInEditing !== product.name">
                        <p>Nome: {{ product.name }}</p>
                        <p>Ativo: {{ product.activatedStatus ? 'Sim' : 'Não' }}</p>
                        <button @click="editField(product)" type="button"> Editar </button>
                        <button @click="removeItem(product)" type="button"> Remover </button>
                    </div>

                    <div class="content edit" v-else-if="fieldInEditing === product.name">
                        <div class="input-container">
                            <label for="name-edit">Nome:</label>
                            <input v-model="editedProducts.nameEdited" id="name-edit" name="name" type="text" />
                        </div>
                        <div class="input-container">
                            <label for="status-edit">Ativo:</label>
                            <select v-model="editedProducts.statusEdited" id="status-edit" name="status">
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
    </div>
</template>

<script>
export default {
    name: 'query-list',
    data() {
        return {
            selectedList: 'customer',
            customerList: this.$store.state.association || [],
            productList: this.$store.state.products || [],
            fieldInEditing: '',
            editedProducts: {
                nameEdited: '',
                statusEdited: ''
            }
        }
    },
    methods: {
        changeList(e) {
            this.selectedList = e.target.id;
        },
        editField(product) {
            this.fieldInEditing = product.name
        },
        removeItem(product) {
            const newProductList = this.productList.filter(item => item.name !== product.name);
            this.productList = newProductList;
        },
        cancelEdit() {
            this.fieldInEditing = ''
        },
        saveField(product) {
            const newProductList = this.productList.map(item => {
                if (item.name === product.name) {
                    return {
                        name: this.editedProducts.nameEdited,
                        activatedStatus: this.editedProducts.statusEdited
                    }
                } else {
                    return item
                }
            });

            this.productList = newProductList;
            this.fieldInEditing = '';
        },
    }
}
</script>

<style scoped>
.list-container {
    position: relative;
}

.list-container h2 {
    position: absolute;
    top: -43px;
    background-color: lightgrey;
    padding: 5px 10px 0 10px;
    border-radius: 5px 5px 0 0;
}

.list-container .button-container button {
    background-color: darkgray;
    color: #ffffff;
    text-shadow: 1px 1px 5px #000000af;
    font-size: 16px;
    border: none;
    box-shadow: 0 0 3px #00000090;
    cursor: pointer;
    margin: 10px 25px 20px 10px;
    padding: 7px 10px;
}

.customer-list,
.product-list {
    border: 1px solid #1d1c1c8e;
    border-radius: 3px;
    padding: 15px;
}

.customer-list p,
.product-list p {
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
    padding: 5px 6px;
    border-radius: 3px;
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