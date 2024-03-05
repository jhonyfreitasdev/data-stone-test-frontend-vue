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

<style lang="sass">
@import './ProductRegistrationForm.sass'
</style>