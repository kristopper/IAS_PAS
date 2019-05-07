Vue.component('workreq-form', {
props: ['userinfo'],
data() {
		return {
			isDisable: false,
			empID_: '',
			datefiled: moment(new Date()).format('YYYY-MM-DD'),
			datestart: moment(new Date()).format('YYYY-MM-DD'),
			dateend: new Date(moment(new Date()).add(1, 'days')),
			totaldays: 1,
			leavetype: 1, //1 sickleave, 2birth leave, 3leave without pay, 4breavementleave, 5vacationleave, 6others
			addmsg: '',
			reqstat: 0, //0 pending, 1//approve //2 declined
			status: 0, //0 open, 1//close
			
		}
},
methods:{
	addLeave(){
		if(this.isFormValid)
		{
			this.isDisable = true;
			this.empID_ = this.userinfo.empID;
			this.totaldays = this.getDiff;
			let params = this.$data;

			axios.post('addleave', params)
				 .then((response)=>{
					 this.closeModal();
			}).catch((err)=>{console.log(err);});
		}
	},

	selectDateStart(val){
		this.datestart = val;
	},
	selectDateEnd(val){
		this.dateend = val;
	},
	closeModal(){
		let obj = this.$data;
		Object.keys(obj).forEach((key)=>{
			if(key != 'datefiled' && key != 'datestart' && key != 'dateend'){
                this.$data[key] =  '';
			}
			if(key == 'leavetype' || key == 'totaldays')
			{
				this.$data[key] = 1;
			}
			if(key == 'reqstat' || key == 'status'){
				this.$data[key] = 0;
			}	
            if(key=='isDisable'){
                this.$data[key] = false;
            }
			
		});

		$("#myModal").modal("hide");
	},

},
computed:{
	fullname(){
		return this.userinfo.lname+', '+this.userinfo.fname;
	},

	getDiff(){
		this.datestart =  moment(this.datestart).format('YYYY-MM-DD');
		this.dateend = moment(this.dateend).format('YYYY-MM-DD');
		let startDate = moment(this.datestart, 'YYYY-MM-DD');
		let endDate = moment(this.dateend, 'YYYY-MM-DD');
		let totaldays = endDate.diff(startDate, 'days');
		this.totaldays = totaldays;
		return totaldays;
	},
	isFormValid(){
			return !Object.keys(this.fields).some(key => this.fields[key].invalid);
	},
},
mounted(){
	$('#myModal').on("hidden.bs.modal", this.closeModal);
	
},
template: 
`<div>
<form method="get" @submit.prevent="addLeave">
	<h3 class="text-center form-title"><span class="dblUnderlined">WORK REQUEST (FOR IT CONCERNS)</span></h3>
		<div class="col-md-12">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Date requested">
					<label class="form-field__label">Date requested</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
				<div class="mdb-form-field form-group-limit">
					<div class="form-field__control">
						<input type="text" class="form-field__input" name="Date Needed">
						<label class="form-field__label">Date Needed</label>
						<div class="form-field__bar"></div>
					</div>
				</div>
			</div>
		<div class="col-md-8">
			<div class="mdb-form-field">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Name">
					<label class="form-field__label">Name</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Contact num">
					<label class="form-field__label">Contact num</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Position">
					<label class="form-field__label">Position</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="mdb-form-field">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Department">
					<label class="form-field__label">Department</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-lg-12">
			<h5 class="form-subtitle"><em>Type of Work</em></h5>
		</div>
		<div class="col-md-12">
			<div class="col-md-4">
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">System Access (SAP, HRIS etc.)</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Borrow item</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">System Autorization</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">RDP Access</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Password Reset</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Internet Access</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Email Setup</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="col-md-4">
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Install APPS (Spark, Skype etc.)</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Setup workstation</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Setup Printer</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Setup Telephone</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Cleaning / Maintenance</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Repair</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Format</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="col-md-4">
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">System Report</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">System Layout</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">GPS Report</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">Conversation History</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">CCTV Report</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
				<div class="group"> 
					<label class="mdblblradio">
					<span class="checklbl">File & Data Recovery</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
					</label>
				</div>
			</div>
		</div>
		<div class="col-lg-12">
			<h5 class="form-subtitle"></h5>
			<div class="mdb-form-field">
					<div class="form-field__control mdb-bgcolor">
						<textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="request-details"></textarea>
						<label class="form-field__label">Request Details</label>
						<div class="form-field__bar"></div>
					</div>
					<h6><span class="errors">{{ errors.first('request-details') }}</span></h6>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="modal-footer">
			<input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
		</div>
</form>
</div>`,
});	

//<input type="submit" class="btn btn-default" data-dismiss="modal" value="Submit">