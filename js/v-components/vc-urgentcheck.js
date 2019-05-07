Vue.component('urgentcheck-form', {
props: ['userinfo'],
data() {
		return {
			isDisable: false,
			empID_: '',
            datefiled: moment(new Date()).format('YYYY-MM-DD'),
            datereleased: moment(new Date()).format('YYYY-MM-DD'),
            vendorname: '',
            amount: '',
            bankname: '',
            accntnum: '',
            addmsg: '',
			
		}
},
methods:{
	addLeave(){
		if(this.isFormValid)
		{
			this.isDisable = true;
			this.empID_ = this.userinfo.empID;
			let params = this.$data;
			axios.post('addleave', params)
				 .then((response)=>{
					 this.closeModal();
			}).catch((err)=>{console.log(err);});
		}
    },
    // closeModal(){
	// 	let obj = this.$data;
	// 	Object.keys(obj).forEach((key)=>{
	// 		if(key != 'datefiled' && key != 'datestart' && key != 'dateend'){
    //             this.$data[key] =  '';
	// 		}
	// 		if(key == 'leavetype' || key == 'totaldays')
	// 		{
	// 			this.$data[key] = 1;
	// 		}
	// 		if(key == 'reqstat' || key == 'status'){
	// 			this.$data[key] = 0;
	// 		}	
    //         if(key=='isDisable'){
    //             this.$data[key] = false;
    //         }
			
	// 	});

	// 	$("#myModal").modal("hide");
	// },

},
computed:{
	fullname(){
		return this.userinfo.lname+', '+this.userinfo.fname;
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
    <h3 class="text-center form-title"><span class="dblUnderlined">URGENT CHECK</span></h3>
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
        <div class="form-group-limit">
                <Datepicker :value="datefiled" wrapper-class="mdb-form-field" name="date" input-class="form-field__input datePicker" :typeable="false" format="yyyy-MM-dd">
                <label slot="afterDateInput" class="form-field__label">Date Released</label>
                <div slot="afterDateInput" class="form-field__bar"></div>
                </Datepicker> 		
        </div>
    </div>
    <div class="col-md-8">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" name="vendor">
                <label class="form-field__label">Payee/Vendor Name</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" name="amount">
                <label class="form-field__label">Amount</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" name="bank-name">
                <label class="form-field__label">Bank Name</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" name="account-number">
                <label class="form-field__label">Bank Account Number</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <h5 class="form-subtitle"></h5>
        <div class="mdb-form-field">
            <div class="form-field__control mdb-bgcolor">
                <textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
                <label class="form-field__label">Reasons for request</label>
                <div class="form-field__bar"></div>
            </div>
            <h6><span class="errors">{{ errors.first('additional-info') }}</span></h6>
        </div>
    </div>
    <div class="col-md-12">
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
    <div class="col-md-12">
    <h5 class="form-subtitle"></h5>
    </div>
    <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" :value="userinfo.lname+', '+userinfo.fname" name="requested-by" readonly="readonly" required>
                <label class="form-field__label">Requested By</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input"  name="approved-by"  required>
                <label class="form-field__label">Approved By</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
         <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input"  name="endorse-by"  required>
                <label class="form-field__label">Endorse By</label>
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