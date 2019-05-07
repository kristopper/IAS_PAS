// BRANCH ENTRY
Vue.component('ccard-form', {
props: ['userinfo'],
data: function () {
	return {

        empID_: '',
        ntmc: '',
        apbw: '',
        philcrest: '',
        tyreplus: '',
        solid: '',
        mobile1:'',
        mobile2:'',
        brandhandle: '',
        isDisable: false,

		}
},
methods:{
	addCard(){
        if(this.isFormValid){
            this.isDisable = true;
            this.empID_ = this.userinfo.empID;

            let params = this.$data;
            axios.post('addccard', params).then((response)=>{
                this.closeModal();
            });
        }
    },

    closeModal(){
        let obj = this.$data;
        Object.keys(obj).forEach((key)=>{
            if(key !='empID'){
                this.$data[key] = '';
            }
        });
        $("#myModal").modal("hide");
    },
},
computed:{
	isFormValid(){
		return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    isBtnValid(){
        let data = this.$data;
        for(let key in data){
            if(
                (key == 'ntmc' && data[key]) || 
                (key == 'apbw' && data[key]) ||
                (key == 'philcrest' && data[key]) ||
                (key == 'tyreplus' && data[key]) ||
                (key == 'solid' && data[key])
            ){
                return true;
            }
        }
        return false;
    }
},
mounted(){
    $('#myModal').on("hidden.bs.modal", this.closeModal);
},
template: `
<div>
	<form method="post" @submit.prevent="addCard">
        <h3 class="text-center form-title"><span class="dblUnderlined">CALLING CARD REQUEST</span></h3>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="userinfo.fname" name="name" readonly="true">
                    <label class="form-field__label">Date Filed</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="userinfo.mname" name="middlename" readonly="true">
                    <label class="form-field__label">Middle Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="userinfo.lname" name="lastname" readonly="true">
                    <label class="form-field__label">Last Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="userinfo.branchname" name="position" readonly="true">
                    <label class="form-field__label">Position</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" :value="userinfo.branchname" name="branch" readonly="true">
                    <label class="form-field__label">Branch</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="mobile1" >
                    <label class="form-field__label">Mobile 1</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('mobile1') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="mobile2" >
                    <label class="form-field__label">Mobile 2</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('mobile2') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="email" readonly="true">
                    <label class="form-field__label">Email</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('email') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" v-validate="'required'" name="product/brand">
                    <label class="form-field__label">Products Brand Handling</label>
                    <div class="form-field__bar"></div>
                </div>
                <span class="errors">{{ errors.first('product/brand') }}</span>
            </div>
        </div>

        <div class="col-md-12">
            <h5 class="form-subtitle">
                <em>PLease select type of card</em>
            </h5>
        </div>
        <div class="col-md-12">
            <div class="col-md-4 col-xs-6">
                <div class="group"> 
                    <label class="mdblbl">
                    <span class="checklbl">NTMC</span>
                    <input type="checkbox" v-model="ntmc" value="NTMC">
                    <span class="mdbcheckmark"></span>
                    </label>
                </div>
                <div class="group"> 
                    <label class="mdblbl">
                    <span class="checklbl">APBW</span>
                    <input type="checkbox" v-model="apbw" value="APBW">
                    <span class="mdbcheckmark"></span>
                    </label>
                </div>
                
            </div>
            <div class="col-md-4 col-xs-6">
                <div class="group"> 
                    <label class="mdblbl">
                    <span class="checklbl">PHILCREST</span>
                    <input type="checkbox" v-model="philcrest" value="PHILCREST">
                    <span class="mdbcheckmark"></span>
                    </label>
                </div>
                <div class="group"> 
                    <label class="mdblbl">
                    <span class="checklbl">TYREPLUS</span>
                    <input type="checkbox" v-model="tyreplus" value="TYREPLUS">
                    <span class="mdbcheckmark"></span>
                    </label>
                </div>
            </div>
            <div class="col-md-4 col-xs-12">
                <div class="group"> 
                    <label class="mdblbl">
                    <span class="checklbl">SOLID</span>
                    <input type="checkbox" v-model="solid" value="SOLID">
                    <span class="mdbcheckmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="modal-footer">
            <input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isBtnValid || !isFormValid">
        </div>
	</form>
</div>`
});