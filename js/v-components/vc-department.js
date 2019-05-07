// DEPARTMENT ENTRY
Vue.component('dept-entry', {
	data: function () {
		return {
			deptname: '',
			isDisable: false,
		}
	},

	methods:{
		addDept(){
				if(this.isFormValid){
					this.isDisable = true;
					let self = this;
					let params = this.$data;
					axios.post('adddept', params).then(function (response) {
						self.$root.getDept();
						self.closeModal();
					});
				}
		},
		closeModal(){ 		
			let obj = this.$data;
			Object.keys(obj).forEach((key)=>{
				if(key=='isDisable'){
				 	this.$data[key] = false;
				}else{	
					this.$data[key] =  '';
				}
			});
			$("#myModal").modal("hide");
		},
	},
	computed:{
		isFormValid(){
			return !Object.keys(this.fields).some(key => this.fields[key].invalid);
		}
	},

	template: `
	<div>
	<form method="post" @submit.prevent="addDept">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Modal Header</h4>
			</div>
				<div class="modal-body">
				    <div class="vforms">   	 
						<div class="group">      
							<input type="text" v-validate="'required'" v-model="deptname" name="deptname" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Department name</label>
							<span class="errors">{{ errors.first('deptname') }}</span>
						</div>
					</div>	  
				</div>
			<div class="modal-footer">
			<input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
		</div>
	</form>
	</div>`
});
