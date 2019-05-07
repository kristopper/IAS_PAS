Vue.component('leave-form', {
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
	<h3 class="text-center form-title"><span class="dblUnderlined">LEAVE APPLICATION FORM</span></h3>
	<div class="col-md-12">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" :value="datefiled" name="datefiled" readonly="true">
				<label class="form-field__label">Date Filed</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" :value="fullname" name="fullname" readonly="true">
				<label class="form-field__label">Full Name</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" :value="userinfo.posname" name="position" readonly="true">
				<label class="form-field__label">Position</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" :value="userinfo.branchname" name="branch" readonly="true">
				<label class="form-field__label">Date Filed</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-12 col-lg-12">
			<h5 class="form-subtitle"><em>Date/s of Leave</em></h5>
	</div>
	<div class="col-md-4">
				<div class="form-group-limit">
							<Datepicker :value="datestart" @selected="selectDateStart" wrapper-class="mdb-form-field" input-class="form-field__input datePicker" :typeable="false" format="yyyy-MM-dd">
							<label slot="afterDateInput" class="form-field__label">Date Start</label>
							<div slot="afterDateInput" class="form-field__bar"></div>
							<span slot="afterDateInput" class="errors">{{ errors.first('mname') }}</span>
							</Datepicker> 		
				</div>
	</div>
	<div class="col-md-4">
				<div class="form-group-limit">
						<Datepicker :value="dateend" @selected="selectDateEnd" wrapper-class="mdb-form-field" input-class="form-field__input datePicker" :typeable="false" format="yyyy-MM-dd">
						<label slot="afterDateInput" class="form-field__label">Date End</label>
						<div slot="afterDateInput" class="form-field__bar"></div>
						<span slot="afterDateInput" class="errors">{{ errors.first('mname') }}</span>
						</Datepicker> 		
				</div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" :value="getDiff" name="branch" readonly="true">
					<label class="form-field__label">total (days)</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>Type of Leave: (Please check (/) appropriate leave to file)</em></h5>
	</div>
	<div class="col-lg-12">
		<div class="col-lg-6">
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Sick Leave</span>
				  <input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				  <span class="checkmark"></span>
				</label>
			</div>
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Birthday Leave</span>
				  <input type="radio" v-model="leavetype" value="2" name="radio">
				  <span class="checkmark"></span>
				</label>
			</div>
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Leave without pay</span>
				  <input type="radio" v-model="leavetype" value="3" name="radio">
				  <span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-lg-6">
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Bereavement Leave</span>
				  <input type="radio" v-model="leavetype" value="4" name="radio">
				  <span class="checkmark"></span>
				</label>
			</div>
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Vacation Leave</span>
				  <input type="radio" v-model="leavetype" value="5" name="radio">
				  <span class="checkmark"></span>
				</label>
			</div>
			<div>
				<label class="mdblblradio">
				  <span class="checklbl">Others (please specify)</span>
				  <input type="radio" v-model="leavetype" value="6" name="radio">
				  <span class="checkmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"></h5>
		<div class="mdb-form-field">
				<div class="form-field__control mdb-bgcolor">
					<textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
					<label class="form-field__label">Reasons to leave</label>
					<div class="form-field__bar"></div>
				</div>
				<h6><span class="errors">{{ errors.first('additional-info') }}</span></h6>
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