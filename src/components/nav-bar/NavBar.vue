<template>
    <header>
        <nav>
            <ul class="list">
                <li class="item registration" @click="toggleActivatedList">
                    Cadastro
                    <ul v-if="activatedList" class="list-registration">
                        <li class="item">
                            <router-link to='/registration/customers'>Cadastro de clientes</router-link>
                        </li>
                        <li class="item">
                            <router-link to='/registration/products'>Cadastro de produtos</router-link>
                        </li>
                    </ul>
                </li>

                <li class="item">
                    <router-link to='/query'>Consultas</router-link>
                </li>

                <li class="item">
                    <router-link to='/association'>Associação</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'nav-bar',
    data() {
        return { activatedList: false }
    },
    methods: {
        toggleActivatedList() { this.activatedList = !this.activatedList; }
    }
}
</script>

<style lang="sass">
@import './NavBar.sass'
</style>