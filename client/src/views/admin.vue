<template>
    <v-app>
        <div  class="app">
            <Sidebar/>
            <router-view></router-view>
        </div>
    </v-app>

</template>

<script setup="setup">
    import Sidebar from '../components/SideBar.vue'

    
</script>

<style lang="scss">
    :root {
        --primary: #ebf4ef;
        --primary-alt: #d3e5da;
        --grey: #f1f5f9;
        --dark: #4b6aac;
        --dark-alt: #334155;
        --light: #f1f5f9;
        --sidebar-width: 300px;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Fira sans', sans-serif;
        font-size: 16px;
    }
    body {
        background: var(--light);
    }
    button {
        cursor: pointer;
        appearance: none;
        border: none;
        outline: none;
        background: none;
    }
    .app {
        display: flex;
        main {
            flex: 1 1 0;
            padding: 2rem;
            @media (max-width: 1024px) {
                padding-left: 6rem;
            }

        }
    }
</style>