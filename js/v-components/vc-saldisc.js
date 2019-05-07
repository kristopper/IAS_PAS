// BRANCH ENTRY
Vue.component('saldisc-form', {
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
	<form method="post" @submit.prevent="addUnderTime">
        <h3 class="text-center form-title"><span class="dblUnderlined">SALARY DISCREPANCY</span></h3>
        <div class="col-md-12">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="datefiled">
                    <label class="form-field__label">Date Filed</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="branch" readonly="true" >
                    <label class="form-field__label">ID no</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="branch" readonly="true" >
                    <label class="form-field__label">Descripancy date</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="branch" readonly="true" >
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="branch" readonly="true" >
                    <label class="form-field__label">Position</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="branch" readonly="true" >
                    <label class="form-field__label">Branch</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
    
        <div class="col-lg-12">
            <h5 class="form-subtitle"></h5> 
            <div class="mdb-form-field">
                <div class="form-field__control mdb-bgcolor">
                    <textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
                    <label class="form-field__label">Please specify here...</label>
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
</div>`
});