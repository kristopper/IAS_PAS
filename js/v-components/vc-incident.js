Vue.component('incident-form', {
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
        <h3 class="text-center form-title"><span class="dblUnderlined">INCIDENT REPORT</span></h3>
        <div class="col-md-4">
            <div class="form-group-limit">
                    <Datepicker :value="dateend" @selected="selectDateEnd" wrapper-class="mdb-form-field" input-class="form-field__input datePicker" :typeable="false" format="yyyy-MM-dd">
                    <label slot="afterDateInput" class="form-field__label">Date Occured</label>
                    <div slot="afterDateInput" class="form-field__bar"></div>
                    </Datepicker> 		
            </div>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="time">
                    <label class="form-field__label">TIME</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="time">
                    <label class="form-field__label">Person/s Involved</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="designation">
                    <label class="form-field__label">Designation</label>
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
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>Nature of Incident</em></h5>
        </div>
        <div class="col-lg-12">
            <div class="col-lg-6">
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Inventory Discrepancy</span>
                        <input type="radio" value="1" name="radio" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Habitual Tardiness</span>
                        <input type="radio" value="2" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Habitual Absences</span>
                        <input type="radio" value="3" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Absence w/o official leave</span>
                        <input type="radio" value="4" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Insubordination</span>
                        <input type="radio" value="5" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Non-compliance to policies/procedures</span>
                        <input type="radio" value="6" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-6">
            <div>
                <label class="mdblblradio">
                    <span class="checklbl">Delivery Discrepancy</span>
                    <input type="radio" value="7" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <label class="mdblblradio">
                    <span class="checklbl">Theft</span>
                    <input type="radio" value="8" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <label class="mdblblradio">
                    <span class="checklbl">Falsification/Tampering of Documents</span>
                    <input type="radio" value="9" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>
            </div>
            <div class="col-lg-6">
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Loss/Damage of Company Property</span>
                        <input type="radio" value="10" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Non remittance/short of collections</span>
                        <input type="radio" value="11" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div>
                    <label class="mdblblradio">
                        <span class="checklbl">Others</span>
                        <input type="radio" value="12" name="radio">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-12">
                <h5 class="form-subtitle"><em>Details of the Incident/Concern</em></h5>
            </div>
            <div class="col-md-12">
                <div class="mdb-form-field">
                    <div class="form-field__control mdb-bgcolor">
                        <textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
                        <label class="form-field__label">(Complete description and details of the incident specifically how and why the incident occurred.)</label>
                        <div class="form-field__bar"></div>
                    </div>
                    <em>Important Note: All pertinent documents supporting the occurrence of the incident should be attached in this form.</em>
                    <h6><span class="errors">{{ errors.first('additional-info') }}</span></h6>
                </div>
            </div>
            <div class="col-lg-12">
                <h5 class="form-subtitle"><em>Initial Action Taken</em></h5>
            </div>
            <div class="col-md-12">
                <div class="mdb-form-field">
                    <div class="form-field__control mdb-bgcolor">
                        <textarea class="form-field__textarea" id="" cols="4" rows="4" v-validate="'required'" v-model="addmsg" name="additional-info"></textarea>
                        <label class="form-field__label">Add details here</label>
                        <div class="form-field__bar"></div>
                    </div>
                    <h6><span class="errors">{{ errors.first('additional-info') }}</span></h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="reported-by">
                        <label class="form-field__label">Reported by</label>
                        <div class="form-field__bar"></div>
                    </div>
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