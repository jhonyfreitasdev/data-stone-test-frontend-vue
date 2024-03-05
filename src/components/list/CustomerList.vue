<template>
    <div class="list-container">
        <p>Lista de Clientes:</p>

        <ul class="list">
            <li class="item" v-for="customer in customerList" :key="customer.document">
                <div class="content" v-if="fieldInEditing !== customer.document">
                    <p>Nome: {{ customer.name }}</p>
                    <p>Documento: {{ customer.document }}</p>
                    <p>Telefone: {{ customer.tel }}</p>
                    <p>Email: {{ customer.mail }}</p>
                    <p>Ativo: {{ customer.activatedStatus ? 'Sim' : 'Não' }}</p>
                    <div>
                        <button @click="editField(customer)" type="button"> Editar </button>
                        <button @click="removeItem(customer)" type="button"> Remover </button>
                        <button @click="changeStatus(customer)" type="button"> {{ customer.activatedStatus ? 'Desativar' : 'Ativar' }} </button>
                    </div>
                </div>

                <div class="content edit" v-else-if="fieldInEditing === customer.document">
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
                    <div class="input-container">
                        <label for="status-edit">Ativo:</label>
                        <select v-model="editedCustomer.status" id="status-edit" name="status">
                            <option value="yes"> Sim </option>
                            <option value="no"> Não </option>
                        </select>
                    </div>
                    <div class="input-container">
                        <button @click="cancelEdit" class="btn-cancel" type="button"> Cancelar </button>
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
            fieldInEditing: '',
            editedCustomer: {
                name: '',
                document: '',
                tel: '',
                mail: '',
                status: ''
            }
        }
    },
    methods: {
        editField(customer) {
            this.fieldInEditing = customer.document
        },
        removeItem(customer) {
            const newCustomerList = this.customerList.filter(item => item.document !== customer.document);
            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
        },
        cancelEdit() {
            this.fieldInEditing = '';
            this.editedCustomer = {
                name: '',
                document: '',
                tel: '',
                mail: '',
                status: ''
            }
        },
        saveField(customer) {
            const newCustomerList = this.customerList.map(item => {
                if (item.document === customer.document) {
                    return {
                        name: this.editedCustomer.name,
                        document: this.editedCustomer.document,
                        tel: this.editedCustomer.tel,
                        mail: this.editedCustomer.mail,
                        activatedStatus: this.editedCustomer.status
                    }
                } else {
                    return item
                }
            });

            this.customerList = newCustomerList;
            this.$store.commit('updateCustomerList', newCustomerList);
            this.fieldInEditing = '';

            this.editedCustomer = {
                name: '',
                document: '',
                tel: '',
                mail: '',
                status: ''
            }
        },
        changeStatus(customer) {
            const newCustomerList = this.customerList.map(item => {
                if (customer.name === item.name) {
                    return {
                        name: customer.name,
                        document: customer.document,
                        tel: customer.tel,
                        mail: customer.mail,
                        activatedStatus: customer.activatedStatus ? false : true
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