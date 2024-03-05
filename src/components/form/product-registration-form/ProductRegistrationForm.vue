<template>
    <div class="form-container">
        <h2>Cadastro de produtos</h2>
        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="product-name">Nome do produto</label>
                <input v-model="name" @change="onChangeName()" id="product-name" name="name" type="text" required/>
            </div>
            <div class="input-container">
                <label for="product-status">Produto ativo</label>
                <select v-model="activatedStatus" name="status" id="product-status" required>
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
        onChangeName() {
            const foundProduct = this.$store.state.products.find(item => item.name === this.name)
            if (foundProduct !== undefined) {
                window.alert('Produto já cadastrado')
                this.name = '';
                this.activatedStatus = '';
            };
        },
        submitForm() {
            this.$store.commit('addProduct', {
                name: this.name,
                activatedStatus: this.activatedStatus === 'yes'
            });

            window.alert('Produto cadastrado com sucesso!')
            this.name = '';
            this.activatedStatus = '';
        }
    }
};
</script>

<style lang="sass">
@import './ProductRegistrationForm.sass'
</style>