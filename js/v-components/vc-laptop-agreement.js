Vue.component('laptop-form', {
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
        <h3 class="text-center form-title"><span class="dblUnderlined">LAPTOP AGREEMENT</span></h3>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="date request">
                            <label class="form-field__label">Date request</label>
                            <div class="form-field__bar"></div>
                    </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="date needed">
                            <label class="form-field__label">Date needed</label>
                            <div class="form-field__bar"></div>
                    </div>
            </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="name">
                            <label class="form-field__label">Name</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="position">
                            <label class="form-field__label">Position</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="department">
                            <label class="form-field__label">Department</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="branch">
                            <label class="form-field__label">Branch</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-12">
            <h5 class="form-subtitle"><em>IT SECTION (Recommendation)</em></h5>
        </div>
        <div class="col-md-12">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="brand">
                            <label class="form-field__label">Brand</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="model">
                            <label class="form-field__label">Model</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="supplier">
                            <label class="form-field__label">Supplier</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="date released">
                            <label class="form-field__label">Date Released</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-12">
            <h5 class="form-subtitle"><em>HR SECTION</em></h5>
        </div>
        <div class="col-md-12">
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
                            <input type="text" value="Deduction Per PayDay" class="form-field__input" name="computation">
                            <label class="form-field__label">Computation</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="date finalized agreement">
                            <label class="form-field__label">Date finalized agreement</label>
                            <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                            <input type="text" class="form-field__input" name="date loan encoded">
                            <label class="form-field__label">Date Loan Encoded</label>
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