Vue.component('miis-form', {
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
	<h3 class="text-center form-title"><span class="dblUnderlined">MARKETING ITEM INFORMATION SHEET (MIIS)</span></h3>
	<div class="col-md-12">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Date filed">
				<label class="form-field__label">Date filed</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
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
				<input type="text" class="form-field__input" name="Department">
				<label class="form-field__label">Department</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Branch">
				<label class="form-field__label">Branch</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>Item Classification</em></h5>
	</div>
	<div class="col-md-12">
		<div class="col-md-2 col-xs-6">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">NTMC</span>
					<input type="radio" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-2 col-xs-6">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">APBW</span>
					<input type="radio" value="2" name="radio">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-2 col-xs-6">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">PHILCREST</span>
					<input type="radio" value="4" name="radio">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-md-2 col-xs-6">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">TYREPLUS</span>
					<input type="radio" value="3" name="radio">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="item type">
				<label class="form-field__label">Item Type</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Inventory type">
				<label class="form-field__label">Inventory type</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Category">
				<label class="form-field__label">Category</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"><em>Item Details</em></h5>
	</div>
	<div class="col-lg-12">
		<div class="col-lg-2">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">New Item</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
		<div class="col-lg-10">
			<div>
				<label class="mdblblradio">
					<span class="checklbl">Existing Item</span>
					<input type="radio" v-model="leavetype" value="1" name="radio" checked="checked">
					<span class="checkmark"></span>
				</label>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Item Description">
				<label class="form-field__label">Item Description</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="mdb-form-field">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="SAP Code">
				<label class="form-field__label">SAP Code</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Status">
				<label class="form-field__label">Status</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Type">
				<label class="form-field__label">Type</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Origin">
				<label class="form-field__label">Origin</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Warehouse">
				<label class="form-field__label">Warehouse</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Quantity">
				<label class="form-field__label">Quantity</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Unit of meassure">
				<label class="form-field__label">Unit of meassure</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Item cost">
				<label class="form-field__label">Item cost</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="mdb-form-field form-group-limit">
			<div class="form-field__control">
				<input type="text" class="form-field__input" name="Total">
				<label class="form-field__label">Total</label>
				<div class="form-field__bar"></div>
			</div>
		</div>
	</div>
	<div class="col-lg-12">
		<h5 class="form-subtitle"></h5>
		<div class="mdb-form-field">
				<div class="form-field__control mdb-bgcolor">
					<textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
					<label class="form-field__label">Remarks</label>
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