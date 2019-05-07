// EMPLOYEE ENTRY
Vue.component('emp-entry', {
	props: ['deptnames', 'branchnames', 'positions'],
	data: function () {
		return {
			isDisable: false,
			empid: '',
			fname: '',
			lname: '',
			mname: '',
			email: '',
			dhired: moment(this.date).format('YYYY-MM-DD HH:mm:ss'),
			gender: '',
			branchid_: '',
			deptid_: '',
			posid_: '',	

		}
	},
	computed:{
		isFormValid(){
			return !Object.keys(this.fields).some(key => this.fields[key].invalid);
		}
	},
	methods:{
		addEmp(){
			if(this.isFormValid){
				this.isDisable = true;
				let self = this;
				this.dhired = moment(this.dhired).format('YYYY-MM-DD HH:mm:ss');
				let params = this.$data;

				let file = this.newAvatar();
				const formData = new FormData();
				formData.append( 'image', file );

				Object.keys(params).forEach((keys)=>{
					formData.append( keys, params[keys]);	
				});
				
				
				//axios
				axios.post('addemp', formData)
				.then(function (response) {
					self.closeModal();
				}).catch((err)=>{
					// self.clear();
				});
			}
			
		},
		
		newAvatar(){
			
			let self = this;
			if(document.querySelector('input#file[type=file]').value != ''){
	        	let preview = document.querySelector('img#emp-avatar'); //selects the query named img
			    let file    = document.querySelector('input#file[type=file]').files[0]; //sames as here
			    

			    let type = file['type'];
			    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
			    if (!validImageTypes.includes(type)) {
				      alert('Invalid Image type');
				      return false;
				}
				if(file.size >= 2000000)
				{
					alert('Filesize exceed 2MB');
				    return false;
				}

				if (file) {
				    let reader  = new FileReader();
				          reader.onloadend = function () {
				          preview.src = reader.result;
				     }
				     reader.readAsDataURL(file); 
				     return file;
				}
			}else{

				return null;
			}
        	
			
		},
		clear(){
			let obj = this.$data;
			Object.keys(obj).forEach((key)=>{
				if(key=='isDisable'){
				 this.$data[key] = false;
				}else{	
				this.$data[key] =  '';
				}
			});
		},
		closeModal(){ 		
			this.clear();
			$("#myModal").modal("hide");
		},
	},

	template: `
	<div>
	<form method="post" @submit.prevent="addEmp" >
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Modal Header</h4>
			</div>
				<div class="modal-body">
					<div class="vforms">
						<div class="avatar-container">
							<label for="file" id="avatarlbl">
							<img id="emp-avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar">
							</label>
							<input id="file" type="file" @change="newAvatar" style="display:none;">
						</div>
						<div class="group">      
							<input type="text" v-validate="'required|numeric'" v-model="empid" name="empid" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Employee ID</label>
							<span class="errors">{{ errors.first('empid') }}</span>
						</div>
						<div class="group">      
							<input type="text" v-model="fname"  v-validate="'required|alpha_spaces'" name="fname" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">First Name</label>
							<span class="errors">{{ errors.first('fname') }}</span>
						</div>
						<div class="group">      
							<input type="text" v-model="lname"  v-validate="'required|alpha_spaces'" name="lname" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Last Name</label>
							<span class="errors">{{ errors.first('lname') }}</span>
						</div>
						<div class="group"> 
							<input type="text" v-model="mname"  v-validate="'required|alpha_spaces'" name="mname" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Middle name</label>
							<span class="errors">{{ errors.first('mname') }}</span>     
							
						</div>
						
						<div class="group">      
							<input type="text" v-model="email"  v-validate="'required|email'" name="email" required>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Email address</label>
							<span class="errors">{{ errors.first('email') }}</span>
						</div>
						<div class="group">      
							 <Datepicker v-model="dhired" wrapper-class="piste" :typeable="false" format="yyyy-MM-dd">
		                        <span slot="afterDateInput" class="highlight"></span>
		                        <span slot="afterDateInput" class="bar"></span>
		                        <label class="mdb" slot="afterDateInput">Date hired</label>
		                        <span slot="afterDateInput" class="errors">{{ errors.first('mname') }}</span>
		                    </Datepicker>
						</div>

						<div class="group">      
							
							<select v-model="gender" name="gender" v-validate="'required'" required>
								<option value="M" >MALE</option>
								<option value="F" >FEMALE</option>
							</select>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Gender</label>
							<span class="errors">{{ errors.first('gender') }}</span>
						</div>

						<div class="group">
							
							<select v-model="branchid_" name="branchid_" v-validate="'required'" required>
								<option :value="item.branchID" v-for="item in branchnames">{{ item.branchname }}</option>
							</select>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Branch</label>
							<span class="errors">{{ errors.first('_branchid') }}</span>
						</div>

						<div class="group">  
							<select v-model="deptid_" name="deptid_" v-validate="'required'" required>
								<option :value="item.deptID" v-for="item in deptnames">{{ item.deptname }}</option>
							</select>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Department</label>
							<span class="errors">{{ errors.first('_deptid') }}</span>
						</div>
						<div class="group">
							
							<select v-model="posid_" name="posid_" v-validate="'required'" required>
								<option :value="item.posID" v-for="item in positions">{{ item.posname }}</option>
							</select>
							<span class="highlight"></span>
							<span class="bar"></span>
							<label class="mdb">Job position</label>
							<span class="errors">{{ errors.first('_postid') }}</span>
						</div>
					</div>
				</div>
			<div class="modal-footer">
			<input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
		</div>
	</form>
	</div>`
});

 function previewFile(){
       var preview = document.querySelector('img#aw'); //selects the query named img
       var file    = document.querySelector('input#aws[type=file]').files[0]; //sames as here
       var type = file['type'];
       const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    
       if (!validImageTypes.includes(type)) {
         alert('asdfasdf');
         return false;
      	}

       if (file) {
        var reader  = new FileReader();
          reader.onloadend = function () {
             preview.src = reader.result;
         }
           reader.readAsDataURL(file); //reads the data as a URL
       } 
  }
