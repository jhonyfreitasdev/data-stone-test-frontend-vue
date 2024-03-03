<template>
    <div class="form-container">
        <h2>Cadastro de produtos</h2>
        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="product-name">Nome do produto</label>
                <input v-model="name" id="product-name" name="name" type="text" />
            </div>
            <div class="input-container">
                <label for="product-status">Produto ativo</label>
                <select v-model="activatedStatus" name="status" id="product-status">
                    <option value="yes"> Sim </option>
                    <option value="no"> Não </option>
                </select>
            </div>
            <div class="input-container">
                <input type="submit" class="btn-submit" value="Cadastrar produto">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'product-registration-form',
    data() {
        return {
            name: '',
            activatedStatus: ''
        };
    },
    methods: {
        submitForm() {
            this.$store.commit('addProduct', {
                name: this.name,
                activatedStatus: this.activatedStatus === 'yes'
            });

            this.name = '';
            this.activatedStatus = '';
        }
    }
};
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
</style>mockDB,