// BRANCH ENTRY
Vue.component('canvas-form', {
props: ['userinfo'],
data: function () {
	return {

        empID_: '',
        datefiled: moment(new Date()).format('YYYY-MM-DD'),
        starttime: moment(new Date()).format('hh:mm'),
        endtime: moment(new Date()).add(30, 'minutes').format('hh:mm'),
        totalhrs: 0,
        addmsg: '',
        isDisable: false,

		}
},
methods:{
	addUnderTime(){
        if(this.isFormValid){
            this.isDisable = true;
            this.empID_ = this.userinfo.empID;
            this.totalhrs = this.getDiffTime;

            let params = this.$data;
            axios.post('addundertime', params).then((response)=>{
                this.closeModal();
            });
        }
    },

    closeModal(){
        let obj = this.$data;
        Object.keys(obj).forEach((key)=>{

            if(key != 'datefiled' && key != 'starttime' && key != 'endtime'){
                this.$data[key] =  '';
            }
            if(key=='isDisable'){
                this.$data[key] = false;
            }
        });
        $("#myModal").modal("hide");
    },
},
computed:{
	isFormValid(){
		return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    },

	getDiffTime(){
		let startTime = moment(this.starttime, "HH:mm:ss");
		let endTime = moment(this.endtime, "HH:mm:ss");
		let totalhrs = endTime.diff(startTime, 'hours')+':'+(endTime.diff(startTime, 'minutes')%60);
		// let totalhrs = moment.duration(endTime.diff(startTime)).as('minutes');
		return totalhrs;
	}
},

mounted(){
	$('#myModal').on("hidden.bs.modal", this.closeModal);
	
	$(this.$refs.clockpicker).clockpicker({ placement: 'bottom', donetext: 'Done', autoclose:false, vibrate: true, })
	.change((e) => {
        this.starttime = e.currentTarget.value;
    });

    $(this.$refs.clockpicker2).clockpicker({ placement: 'bottom', donetext: 'Done', autoclose:false, vibrate: true, })
	.change((e) => {
        this.endtime = e.currentTarget.value;
    });
},
template: `
<div>
    <h3 class="text-center form-title"><span class="dblUnderlined">PURCHASING CANVAS SHEET</span></h3>
	<div class="col-md-12">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="date-filed" readonly="true">
                    <label class="form-field__label">Date Filed</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="clearfix"></div>
	<div class="mdb-table-overflow" >
		<table width="100%" class="table table-hover mdb-table">
			<thead>
				<tr>
					<th class="text-center" width="200px">BRAND</th>
					<th class="text-center">ITEM DESCRIPTION</th>
					<th class="text-center">UNIT COST</th>
					<th class="text-center">QTY</th>
					<th class="text-center">TOTAL</th>
					<th class="text-center">REMARKS</th>
				</tr>
				<tr>
					<td>
						<div class="mdb-form-field form-group-limit">
							<div class="form-field__control form-field--is-filled">
								<input type="text" name="Brand" v-validate="'required'" class="form-field__input inline-input" >
								<div class="form-field__bar"></div>
							</div>
							<span class="errors">{{ errors.first('Brand') }}</span>
						</div>
					</td>
					<td>
						<div class="mdb-form-field form-group-limit">
							<div class="form-field__control form-field--is-filled">
								<input type="text" name="Item Description" v-validate="'required'" class="form-field__input inline-input" >
								<div class="form-field__bar"></div>
							</div>
							<span class="errors">{{ errors.first('Item Description') }}</span>
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
								<input type="text" name="QTY" v-validate="'required'" class="form-field__input inline-input" >
								<div class="form-field__bar"></div>
							</div>
							<span class="errors">{{ errors.first('QTY') }}</span>
						</div>
					</td>
					<td>
						<div class="mdb-form-field form-group-limit">
							<div class="form-field__control form-field--is-filled">
								<input type="text" name="total" v-validate="'required'" class="form-field__input inline-input" >
								<div class="form-field__bar"></div>
							</div>
							<span class="errors">{{ errors.first('total') }}</span>
						</div>
					</td>
					<td>
						<div class="mdb-form-field form-group-limit">
							<div class="form-field__control form-field--is-filled">
								<input type="text" name="remarks" v-validate="'required'" class="form-field__input inline-input" >
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
		<h5 class="form-subtitle"><em>Supplier info</em></h5>
	</div>
	<div class="col-md-4">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="delivery-days" >
                    <label class="form-field__label">Days of Delivery</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-8">
			<div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="terms" >
                    <label class="form-field__label">Terms</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-6">
			<div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="company" >
                    <label class="form-field__label">Company Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-6">
			<div class="mdb-form-field ">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="contact-person" >
                    <label class="form-field__label">Contact Person</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
	</div>
	<div class="col-md-12">
		<h5 class="form-subtitle"><em>With Quotation Submitted?</em></h5>
	</div>
	<div class="col-md-12">
			<div class="col-md-2 col-xs-6">
					<div>
							<label class="mdblblradio">
							<span class="checklbl">YES</span> 
							<input type="radio" value="2" name="radio"> 
							<span rf="" online="" class="checkmark"></span>
							</label>
					</div>
			</div>
			<div class="col-md-10 col-xs-6">
					<div>
							<label class="mdblblradio">
							<span class="checklbl">NO</span> 
							<input type="radio" value="2" name="radio"> 
							<span rf="" online="" class="checkmark"></span>
							</label>
					</div> 
			</div>
	</div>
	<div class="clearfix"></div>
	<div class="col-md-12">
		<h5 class="form-subtitle"><em>Canvas request for</em></h5>
	</div>
	<div class="col-md-12">
			<div class="col-md-2 col-xs-6">
				<div>
						<label class="mdblblradio">
						<span class="checklbl">NTM</span> 
						<input type="radio" value="2" name="radio"> 
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="col-md-10 col-xs-6">
				<div>
						<label class="mdblblradio">
						<span class="checklbl">APBW</span> 
						<input type="radio" value="2" name="radio"> 
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
	</div>
    <div class="clearfix"></div>
        <div class="modal-footer">
            <input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
    </div>
</div>`
});