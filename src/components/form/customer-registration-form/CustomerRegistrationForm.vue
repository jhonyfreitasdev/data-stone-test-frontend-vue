<template>
    <div class="form-container">
        <h2>Cadastro de clientes</h2>
        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="customer-name">Nome completo</label>
                <input v-model="name" type="text" name="name" id="customer-name" required>
            </div>
            <div class="input-container">
                <label for="customer-document">CPF</label>
                <input v-model="document" @change="onChangeDocument" type="text" name="document"
                    id="customer-document" required>
            </div>
            <div class="input-container">
                <label for="customer-tel">Telefone</label>
                <input v-model="tel" type="tel" name="tel" id="customer-tel" required>
            </div>
            <div class="input-container">
                <label for="customer-mail">Email</label>
                <input v-model="mail" type="mail" name="mail" id="customer-mail" required>
            </div>
            <div class="input-container">
                <label for="customer-status">Cliente ativo</label>
                <select v-model="activatedStatus" name="status" id="customer-status" required>
                    <option value="yes"> Sim </option>
                    <option value="no"> Não </option>
                </select>
            </div>
            <div class="input-container">
                <input type="submit" class="btn-submit" value="Cadastrar cliente ">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'customer-registration-from',
    data() {
        return {
            name: '',
            document: '',
            tel: '',
            mail: '',
            activatedStatus: null
        }
    },
    methods: {
        onChangeDocument() {
            const foundCustomer = this.$store.state.customers.find(item => item.document === this.document)
            if (foundCustomer !== undefined) {
                window.alert('Cliente já cadastrado')
                this.name = '';
                this.document = '';
                this.tel = '';
                this.mail = '';
                this.activatedStatus = null
            };
        },
        submitForm() {
            this.$store.commit('addCustomer', {
                name: this.name,
                document: this.document,
                tel: this.tel,
                mail: this.mail,
                activatedStatus: this.activatedStatus === 'yes',
                associatedProducts: []
            });

            window.alert('Cliente cadastrado com sucesso!')
            this.name = '';
            this.document = '';
            this.tel = '';
            this.mail = '';
            this.activatedStatus = null
        }
    }
}
</script>

<style lang="sass">
    @import './CustomerRegistrationForm.sass'
</style>