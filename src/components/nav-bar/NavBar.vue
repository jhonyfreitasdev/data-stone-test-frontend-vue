<template>
    <header>
        <nav>
            <ul class="list">
                <ul>
                    <li class="item">
                        <router-link to='/registration/customers'>Cadastro de clientes</router-link>
                    </li>
                    <li class="item">
                        <router-link to='/registration/products'>Cadastro de produtos</router-link>
                    </li>
                </ul>

                <li class="item">
                    <router-link to='/query'>Consultas</router-link>
                </li>

                <li class="item">
                    <router-link to='/association'>Associação de produtos com clientes</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'nav-bar',
}
</script>

<style lang="sass">
@import './NavBar.sass'
</style>