Vue.component('prs-form', {
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
			remarks: '',
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
	<h3 class="text-center form-title"><span class="dblUnderlined">PURCHASE RECEIVING SLIP</span></h3>
	<div class="col-md-12">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input"  name="date" >
                    <label class="form-field__label">Date</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input"  name="received-from" >
                    <label class="form-field__label">Received From</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input"  name="requested-by" >
                    <label class="form-field__label">Requested By</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input"  name="po/prf-ref" >
                    <label class="form-field__label">PO/PRF REF</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="clearfix"></div>
	<div class="mdb-table-overflow">
		<table width="100%" class="table table-hover mdb-table">
			<thead>
					<tr>
							<th class="text-center" width="200px">DESCRIPTION</th>
							<th class="text-center">UOM</th>
							<th class="text-center">QTY</th>
							<th class="text-center">UNIT COST</th>
							<th class="text-center">TOTAL COST</th>
							<th class="text-center">REMARKS</th>
					</tr>
					<tr>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="description" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('description') }}</span>
								</div>
							</td>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="UOM" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('UOM') }}</span>
								</div>
							</td>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="QTY" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('QTY') }}</span>
								</div>
							</td>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="Unit Cost" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('Unit Cost') }}</span>
								</div>
							</td>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="Total Cost" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('Total Cost') }}</span>
								</div>
								
							</td>
							<td>
								<div class="mdb-form-field form-group-limit">
									<div class="form-field__control form-field--is-filled">
										<input type="text" name="remarks" v-model="remarks" v-validate="'required'" class="form-field__input inline-input" >
										<div class="form-field__bar"></div>
									</div>
									<span class="errors">{{ errors.first('remarks') }}</span>
								</div>
								<input type="submit" style="position: absolute; left: -999999px;">
							</td>
					</tr>
			</thead>
			<tbody>
					<tr v-show="false">
							<td>
									sdf
							</td>
							<td>sdf</td>
							<td>sdf</td>
							<td>s</td>
					</tr>
			</tbody>
		</table>
	</div>
	<div class="col-md-12">
		<h5 class="form-subtitle"></h5>
	</div>
	<div class="col-md-12">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="si/dr-refno." >
                    <label class="form-field__label">SI/DR Ref. No.</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="issued-by" >
                    <label class="form-field__label">Issued By</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="delivered-by" >
                    <label class="form-field__label">Delivered By</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="received-by" >
                    <label class="form-field__label">Received By</label>
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