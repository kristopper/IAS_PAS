Vue.component('companyloan-form', {
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
        <h3 class="text-center form-title"><span class="dblUnderlined">COMPANY LOAN</span></h3>
        <div class="col-md-12">
            <div class="form-group-limit">
                    <Datepicker :value="dateend" @selected="selectDateEnd" wrapper-class="mdb-form-field" name="date" input-class="form-field__input datePicker" :typeable="false" format="yyyy-MM-dd">
                    <label slot="afterDateInput" class="form-field__label">Date</label>
                    <div slot="afterDateInput" class="form-field__bar"></div>
                    <span slot="afterDateInput" class="errors">{{ errors.first('date') }}</span>
                    </Datepicker> 		
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="name" readonly="true">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('name') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="position" readonly="true">
                    <label class="form-field__label">Position</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('position') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="contactnum">
                    <label class="form-field__label">Contact #</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('contactnum') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="address">
                    <label class="form-field__label">Address</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('address') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="date-hired" readonly="true">
                    <label class="form-field__label">Date hired</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('date-hired') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="dept/branch" readonly="true">
                    <label class="form-field__label">Dept/Branch</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('dept/branch') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="bank-name"">
                    <label class="form-field__label">Bank Name</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('bank-name') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="banck-acount-number">
                    <label class="form-field__label">Bank Account #</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('banck-acount-number') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="loan-amount" >
                    <label class="form-field__label">Loan Amount (₱)</label>
                    <div class="form-field__bar"></div>
                    <span class="errors">{{ errors.first('loan-amount') }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <h5 class="form-subtitle"><em>REASON: (Please check appropriate box) </em></h5>
        </div>
        <div class="col-md-12">
            <div>
                <label class="mdblblradio">
                <span class="checklbl">MEDICAL (not covered by Philhealth and the Company’s Medical Assistance Program)</span> 
                <input type="radio" value="1" name="radio" checked="checked"> 
                <span class="checkmark"></span>
                </label>
                <div class="col-md-12 blockindent">
                        <div><em>Requirements</em></div>
                        <ul>
                            <li>Hospital Bill / Statement of Account</li>
                            <li>Doctor’s Order or Certification</li>
                            <li>Official Receipt (to be submitted 3 days from release of cash/check)</li>
                        </ul>
                </div>
                <div class="clearfix"></div>
            </div>
            <div>
                <label class="mdblblradio">
                <span class="checklbl">EDUCATION (for Tuition Fee only; can be availed up to twice a year per employee only)</span> 
                <input type="radio" value="1" name="radio" checked="checked"> 
                <span class="checkmark"></span>
                </label>
                <div class="col-md-12 blockindent">
                        <div><em>Requirements</em></div>
                        <ul>
                            <li>School Assessment / Statement of Account</li>
                            <li>Official Receipt (to be submitted 3 days from release of cash/check)</li>
                        </ul>
                </div>
                <div class="clearfix"></div>
            </div>
            <div>
                <label class="mdblblradio">
                <span class="checklbl">FAMILY EMERGENCY (hospitalization and other immediate family emergencies only)</span> 
                <input type="radio" value="1" name="radio" checked="checked"> 
                <span class="checkmark"></span>
                </label>
                <div class="col-md-12 blockindent">
                        <div><em>Requirements</em></div>
                        <ul>
                            <li>Any valid proof</li>
                            <li>Official Receipt (to be submitted 3 days from release of cash/check)</li>
                        </ul>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12">
                    <h5></h5>
                </div>
                <div class="col-md-12">
                        <div class="mdb-form-field form-group-limit">
                            <div class="form-field__control">
                                <input type="text" class="form-field__input" name="situation">
                                <label class="form-field__label">Please specify situation...</label>
                                <div class="form-field__bar"></div>
                                <span class="errors">{{ errors.first('situation') }}</span>
                            </div>
                        </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div>
                <label class="mdblblradio">
                <span class="checklbl">REPAIR OR INSTALLATION OF HOUSE (caused by natural calamities: flood, earthquake, typhoon, fire, etc.</span> 
                <input type="radio" value="1" name="radio" checked="checked"> 
                <span class="checkmark"></span>
                </label>
                <div class="col-md-12 blockindent">
                        <div><em>Requirements</em></div>
                        <ul>
                            <li>Cost Breakdown (Labor & materials)</li>
                            <li>Pictures before and after repair</li>
                            <li>Summary of Expenses (Labor & materials)</li>
                            <li>Official Receipt (to be submitted 3 days from release of cash/check)</li>
                        </ul>
                </div>
                <div class="clearfix"></div>
            </div>
            <div>
                <label class="mdblblradio">
                <span class="checklbl">PURCHASE OF MOTORCYCLE & OTHER VEHICLE (can be availed one time per employee; employee must bear the name of the receipt)</span> 
                <input type="radio" value="1" name="radio" checked="checked"> 
                <span class="checkmark"></span>
                </label>
                <div class="col-md-12 blockindent">
                        <div><em>Requirements</em></div>
                        <ul>
                            <li>Cost / Quotation from store or supplier</li>
                            <li>Pictures before and after repair</li>
                            <li>Official Receipt (to be submitted 3 days from release of cash or check)</li>
                        </ul>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12">
                    <h5></h5>
                </div>
                <div class="col-md-6">
                        <div class="mdb-form-field form-group-limit">
                            <div class="form-field__control">
                                <input type="text" class="form-field__input" name="payment-period">
                                <label class="form-field__label">Suggested Payment per Period</label>
                                <div class="form-field__bar"></div>
                                <span class="errors">{{ errors.first('payment-period') }}</span>
                            </div>
                        </div>
                </div>
                <div class="col-md-6">
                        <div class="mdb-form-field form-group-limit">
                            <div class="form-field__control">
                                <input type="text" class="form-field__input" name="incentives">
                                <label class="form-field__label">Incentives</label>
                                <div class="form-field__bar"></div>
                                <span class="errors">{{ errors.first('incentives') }}</span>
                            </div>
                        </div>
                </div>
                <div class="clearfix"></div>
            </div>
            </div>
    
            <div class="col-md-12">
                <div class="group">
                    <label class="mdblbl">
                    <span class="checklbl form-note">I hereby agree to the guidelines and conditions set in this application form and allows North Trend Marketing Corporation to deduct from my salary the corresponding amount as payment for my applied loan</span> 
                    <input type="checkbox" value="APBW"> 
                    <span class="mdbcheckmark"></span>
                    </label>
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