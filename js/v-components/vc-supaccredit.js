Vue.component('sup-accredit-form', {
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
	<h3 class="text-center form-title"><span class="dblUnderlined">SUPPLIER ACCREDIATION</span></h3>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>SUPPLIERS' INFORMATION </em></h5>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Supplier's Name">
				<label class="form-field__label">Supplier's Name</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Head Office Address">
				<label class="form-field__label">Head Office Address</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Branch Address">
				<label class="form-field__label">Branch Address</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Product/Service">
				<label class="form-field__label">Product/Service</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Website">
				<label class="form-field__label">Website</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Contact Person">
				<label class="form-field__label">Contact Person</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Phone num">
				<label class="form-field__label">Phone num</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Mobile num">
				<label class="form-field__label">Mobile num</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Fax num">
				<label class="form-field__label">Fax num</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="TIN">
				<label class="form-field__label">TIN</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="SEC/DTI Reg No.">
				<label class="form-field__label">SEC/DTI Reg No.</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Date Reg">
				<label class="form-field__label">Date Reg</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Philhealth">
				<label class="form-field__label">Philhealth</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="SSS Number">
				<label class="form-field__label">SSS Number</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>SUPPLIERS PROFILE</em></h5>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Year in Business">
				<label class="form-field__label">Year in Business</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Total Capitalization">
				<label class="form-field__label">Total Capitalization</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Total Asset">
				<label class="form-field__label">Total Asset</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Total Liabilities">
				<label class="form-field__label">Total Liabilities</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="Industry">
					<label class="form-field__label">Industry</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="No. of Employees">
					<label class="form-field__label">No. of Employees</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="No. of Regular Employees">
					<label class="form-field__label">No. of Regular Employees</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="mdb-form-field form-group-limit">
				<div class="form-field__control">
					<input type="text" class="form-field__input" name="No.of active clients">
					<label class="form-field__label">No.of active clients</label>
					<div class="form-field__bar"></div>
				</div>
			</div>
		</div>

	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>DOCUMENTS PROVIDED</em></h5>
	</div>
	<div class="col-md-12">
		<div class="col-md-6">
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">DTI/SEC Resgistration*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Latest Business Permit*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">BIR Registration*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Latest SEC GIS received by SEC</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Latest Audited Financial Statements*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">A copy of the blank OR or Invoice*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-6">
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Company Profile/Annual Report</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">List of Clients*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">List of Suppliers</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Pictures of the Establishment*</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
			<div class="group"> 
				<label class="mdblbl">
				<span class="checklbl">Pictures of products/work, if any</span>
				<input type="checkbox" value="NTMC">
				<span class="mdbcheckmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>BANK DETAILS and PAYMENT REQUIREMENT</em></h5>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Bank/Branch">
				<label class="form-field__label">Bank/Branch</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Account No">
				<label class="form-field__label">Account No</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Account Name">
				<label class="form-field__label">Account Name</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>PAYMENT TERMS</em></h5>
	</div>
	<div class="col-md-12">
		<div class="col-md-2">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">30 days</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-2">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">60 days</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-8">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">90 days</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-md-12">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Others">
				<label class="form-field__label">Others</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>PAYMENT MODE</em></h5>
	</div>
	<div class="col-md-12">
		<div class="col-md-2">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">Cash</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-2">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">Check</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-8">
			<div>
				<label class="mdblblradio">
				<span class="checklbl">Online Deposit</span>
				<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
				<span class="checkmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>QUALITY ASSURANCE</em></h5>
	</div>
	<div class="col-md-12">
		<p>Are we assured that the products leaving your facility are properly scrutinized to be free of defects and are the right quantity and quality?</p>
	</div>
	<div class="col-md-12">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Specify here">
				<label class="form-field__label">Specify here</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-12">
		<p>Do you take responsibilty for all items delivered that do not meet the  aggreed specification and quantities?</p>
	</div>
	<div class="col-md-12">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Specify here">
				<label class="form-field__label">Specify here</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"></h5>
		<div class="mdb-form-field">
				<div class="form-field__control mdb-bgcolor">
					<textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
					<label class="form-field__label">Please described the after sales services you can extend to NTM:</label>
					<div class="form-field__bar"></div>
				</div>
				<h6><span class="errors">{{ errors.first('additional-info') }}</span></h6>
		</div>
		<p class="form-note">
				The undersigned hereby confirms that the above information is true and correct, and that  are  duly authorized to enter into this accreditation process.    Moreover,  all the supporting documents attached here into are true and authentic .    Furthermore, 
				I hereby authorize NTMC to obtain pertinent information from clients, banks and any other source necessary for the objective of evaluation for this application. 
				
		</p>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Owner/Representative">
				<label class="form-field__label">Owner/Representative's Name</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Owner/Representative">
				<label class="form-field__label">Date</label>
				<div class="form-field__bar"></div>
			</div>
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