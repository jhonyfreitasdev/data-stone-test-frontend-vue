<template>
    <div class="form-container">
        <h2>Cadastro de clientes</h2>
        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="customer-name">Nome completo</label>
                <input v-model="name" type="text" name="name" id="customer-name">
            </div>
            <div class="input-container">
                <label for="customer-document">CPF</label>
                <input v-model="document" type="text" name="document" id="customer-document">
            </div>
            <div class="input-container">
                <label for="customer-tel">Telefone</label>
                <input v-model="tel" type="tel" name="tel" id="customer-tel">
            </div>
            <div class="input-container">
                <label for="customer-mail">Email</label>
                <input v-model="mail" type="mail" name="mail" id="customer-mail">
            </div>
            <div class="input-container">
                <label for="customer-status">Cliente ativo</label>
                <select v-model="activatedStatus" name="status" id="customer-status">
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
        submitForm() {
            this.$store.commit('addCustomer', {
                name: this.name,
                document: this.document,
                tel: this.tel,
                mail: this.mail,
                activatedStatus: this.activatedStatus === 'yes',
                associatedProducts: []
            });

            this.name= '';
            this.document = '';
            this.tel = '';
            this.mail = '';
            this.activatedStatus = null
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
    border-radius: 6px;
    padding: 6px;
}

.form-container form .input-container input,
select {
    border: 1px solid #1d1c1c8e;
    border-radius: 6px;
    padding: 6px;
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
</style>