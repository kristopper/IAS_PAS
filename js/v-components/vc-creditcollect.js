// BRANCH ENTRY
Vue.component('creditcollect-form', {
props: ['userinfo'],
data: function () {
	return {
        overridetype: 1,
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
    <h3 class="text-center form-title"><span class="dblUnderlined">OVERRIDE REQUEST</span></h3>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Date">
                    <label class="form-field__label">Date</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Date Open">
                    <label class="form-field__label">Date Open</label>
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
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Customer Name">
                    <label class="form-field__label">Customer Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
          <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Brand">
                    <label class="form-field__label">Brand</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>SALES ADVISOR</em></h5>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Delivery">
                    <label class="form-field__label">Delivery</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="SO NO.">
                    <label class="form-field__label">SO NO.</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>REASON OF OVERRIDE REQUEST</em></h5>
        </div>
        <div class="col-md-12">
            <div class="col-md-5">
                <div>
                    <label class="mdblblradio">
                    <span class="checklbl">OVER CREDIT LIMIT OR NO CREDIT LIMIT</span>
                    <input type="radio" v-model="overridetype" value="1" name="radio">
                    <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="col-md-2">
                <div>
                    <label class="mdblblradio">
                    <span class="checklbl">ON HOLD</span>
                    <input type="radio" v-model="overridetype" value="2" name="radio">
                    <span class="checkmark"></span>
                    </label>
                </div>
               </div>
            <div class="col-md-2">
                <div>
                    <label class="mdblblradio">
                    <span class="checklbl">OVERDUE</span>
                    <input type="radio" v-model="overridetype" value="3" name="radio">
                    <span class="checkmark"></span>
                    </label>
                </div>
               </div>
            <div class="col-md-3">
                <div>
                    <label class="mdblblradio">
                    <span class="checklbl">OTHERS</span>
                    <input type="radio" v-model="overridetype" value="4" name="radio">
                    <span class="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <!-- onhold option -->
        <div v-show="overridetype==2">
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="reason">
                        <label class="form-field__label">Reason</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="current status">
                        <label class="form-field__label">Current Status</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- overcredditlimit -->
        <div v-show="overridetype==1">
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">CL</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">C/R</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">PDC</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">ORDER</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">TOtal</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">Excess</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">Last Approve Increase</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="currentstat">
                        <label class="form-field__label">Commitment to Increase</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- overdue -->
        <div v-show="overridetype==3">
            <div class="col-md-12">
                <div class="mdb-table-overflow">
                    <table width="100%" class="table table-hover mdb-table">
                        <thead>
                            <tr>
                                <th class="text-center" width="200px">INVOICE NO.</th>
                                <th class="text-center">DATE</th>
                                <th class="text-center">AMOUNT</th>
                                <th class="text-center">BRAND</th>
                                <th class="text-center">AGE</th>
                            </tr>
                            <tr>
                                <td>
                                    <Datepicker wrapper-class="mdb-form-field" input-class="form-field__input datePicker inline-input" :typeable="false" format="yyyy-MM-dd">
                                    <div slot="afterDateInput" class="form-field__bar"></div>
                                    </Datepicker>
                                </td>
                                <td>
                                    <div class="mdb-form-field form-group-limit">
                                        <div class="form-field__control form-field--is-filled">
                                            <input type="time" name="starttime" v-validate="'required'" class="form-field__input inline-input" >
                                            <div class="form-field__bar"></div>
                                        </div>
                                        <span class="errors">{{ errors.first('timein') }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="mdb-form-field form-group-limit">
                                        <div class="form-field__control form-field--is-filled">
                                            <input type="time" name="timeout" v-validate="'required'" class="form-field__input inline-input" >
                                            <div class="form-field__bar"></div>
                                    </div>
                                        <span class="errors">{{ errors.first('timeout') }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="mdb-form-field">
                                        <div class="form-field__control">
                                            <input type="text" class="form-field__input inline-input" name="reason">
                                            <div class="form-field__bar"></div>
                                    </div>
                                        <span class="errors">{{ errors.first('reason') }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="mdb-form-field">
                                        <div class="form-field__control">
                                            <input type="text" class="form-field__input inline-input" name="reason">
                                            <div class="form-field__bar"></div>
                                    </div>
                                        <span class="errors">{{ errors.first('reason') }}</span>
                                    </div>
                                    <input type="submit" style="position: absolute; left: -999999px;">
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-show="false">
                                    <td>sdf</td>
                                    <td>sdf</td>
                                    <td>sdf</td>
                                    <td>s</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div> <!-- end overdue -->
        </div>
        <!-- Others -->
        <div v-show="overridetype==4">
            <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="Reason">
                        <label class="form-field__label">Reason</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="commitment">
                        <label class="form-field__label">Commitment</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Others -->
    <div class="clearfix"></div>
        <div class="modal-footer">
        <input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
    </div>
</div>`
});
