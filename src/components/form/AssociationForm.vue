<template>
    <div class="form-container">
        <h2> Associação de produtos </h2>

        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="names">Selecione um nome para associar:</label>
                <select v-model="selectedName" name="names" id="names">
                    <option value=""></option>
                    <option v-for="name in nameList" :key="name.document" :value="name.name">{{ name.name }}</option>
                </select>
            </div>

            <div class="input-container">
                <label for="names"> Produtos: </label>
                <div v-for="product in productList" :key="product.name">
                    <input type="checkbox" v-model="selectedProduct" :value="product" :id="product.name">
                    {{ product.name }}
                </div>
            </div>


            <div class="input-container">
                <input type="submit" class="btn-submit" value="Associar">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'association-form',
    data() {
        return {
            nameList: this.$store.state.customers,
            productList: this.$store.state.products,
            selectedName: '',
            selectedProduct: []
        }
    },
    methods: {
        submitForm() {
            const productList = this.selectedProduct.map(product => product.name);

            this.$store.commit('createAssociationList', {
                name: this.selectedName,
                productList
            });

            console.log(this.$store.state.association);
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