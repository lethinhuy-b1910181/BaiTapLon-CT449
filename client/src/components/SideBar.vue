<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img :src="logoURL" alt="Vue" /> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<i class=" fa-solid fa-angles-right"></i>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/show-user" class="button">
				<i class="material-icons fa-solid fa-users-gear mx-3"></i>
				<span class="text">Tài khoản</span>
			</router-link>
			<router-link to="/category" class="button">
				<i class="material-icons fa-brands fa-buffer mx-3"></i>
				
				<span class="text">Danh mục</span>
			</router-link>
			<router-link to="/show-product" class="button">
				<i class="material-icons fa-solid fa-boxes-stacked mx-3"></i>
				
				<span class="text">Sản phẩm</span>
			</router-link>
			
		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/" class="button">
                <i class=" material-icons  fa-solid fa-right-from-bracket mx-3"></i>
				<span class="text">Đăng xuất</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.png'
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
	background-color: #004D40;
	color: var(--light);
	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	transition: 0.2s ease-in-out;
	.flex {
		flex: 1 1 0%;
	}
	.logo {
		margin-bottom: 1rem;
		img {
			width: 2rem;
		}
	}
	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;
		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: white;
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: white;
					transform: translateX(0.5rem);
				}
			}
		}
	}
	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}
	.menu {
		margin: 0 -1rem;
		.button {
			display: flex;
			align-items: center;
			text-decoration: none;
			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;
			.material-icons {
				font-size: 1.2rem;
				color: white;
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			&:hover {
				background-color:#009688;
				.material-icons, .text {
					color: white;
				}
			}
			&.router-link-exact-active {
				background-color: #009688;
				border-right: 5px solid #00695C;
				.material-icons, .text {
					color:  white;
				}
			}
		}
	}
	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}
	&.is-expanded {
		width: var(--sidebar-width);
		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}
		h3, .button .text {
			opacity: 1;
		}
		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
		.footer {
			opacity: 0;
		}
	}
	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>