<template>
	<div>
		<div class="bg-login">
			<div class="d-table vh-100 w-100">
				<div class="d-table-cell align-middle text-center zi-1">
					<form class="form-auth" @submit.prevent="login">
						<div class="alert alert-danger" v-if="isError">
							{{ message }} <span class="alert dismiss" @click="dismiss">x</span>
						</div>
						<div class="alert alert-success" v-if="isSuccess">
							{{ message }} <router-link to="login">login</router-link> <span class="alert dismiss" @click="dismiss">x</span>
						</div>
						<h3>Register</h3>
						<div class="p-3"></div>
						<div class="form-group">
							<input type="text" v-model="username" class="form-control" placeholder="Username ... ">
						</div>
						<div class="form-group">
							<input type="password" v-model="password" class="form-control" placeholder="Password ...">
						</div>
						<div class="form-group">
							<input type="checkbox" v-model="role_id"> Apakah Admin ?
						</div>
						<div class="form-group">
							<button class="btn btn-primary">
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.form-auth {
		background-color: #fff;
		border-radius: 0;
		padding: 30px;
		width: 50%;
		margin: 0 auto;
	}
	@media only screen and (max-width: 768px ){
		.form-auth {
			width: 95%;
		}
	}
	.zi-1 {
		position: relative;
		z-index: 1;
	}
	.vh-100{
		min-height: 100vh;
	}
	.bg-login {
		background-color: #d2FAA2;
		min-height: 100vh;
	}

	.bg-login::after {
		content: "";
		height: 50vh;
		width: 100%;
		background-color: #FAd2A2;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
				message: "",
				role_id: false,
				isError: false,
				isSuccess: false
			}
		},
		methods: {
			dismiss(){
				this.isError = false;
				this.isSuccess = false;
			},
			login(){
				if(this.role_id){
					this.role_id = 1;
				}else{
					this.role_id = 2;
				}
				let data = {
					username: this.username,
					password: this.password,
					role_id: this.role_id
				}

				this.$axios.post('http://localhost:8000/register',data).then(
					res => {
						let anu = res.data;
						if(anu.success == true){
							this.isSuccess = true;
							this.message = "Akun berhasil dibuat silahan";
						}else{
							this.isError = true;
							this.message = anu.message;
						}
					})
				// let formData = new FormData();
				// formData.append()
			}
		}
	}
</script>