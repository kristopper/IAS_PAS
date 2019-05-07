// BRANCH ENTRY
Vue.component('attendanceoffset-form', {
    props: ['userinfo'],
    data: function () {
        return {
    
            empID_: '',
            datefiled: moment(new Date()).format('YYYY-MM-DD'),
            starttime: moment(new Date()).format('hh:mm'),
            endtime: moment(new Date()).add(30, 'minutes').format('hh:mm'),
            totalhrs: 0,
            reason: '',
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
        <h3 class="text-center form-title"><span class="dblUnderlined">WORK OFF-SET FORM</span></h3>
        <div class="col-md-12">
            <div class="mdb-table-overflow">
                <form  method="post" @submit.prevent="addEmp" >
                    <table width="100%" class="table table-hover mdb-table">
                            <thead>
                                <tr>
                                    <th class="text-center" width="200px">DATE</th>
                                    <th class="text-center">TIME IN</th>
                                    <th class="text-center">TIME OUT</th>
                                    <th class="text-center">REASON</th>
                                </tr>
                                <tr>
                                    <td>
                                        <Datepicker :value="datefiled" wrapper-class="mdb-form-field" input-class="form-field__input datePicker inline-input" :typeable="false" format="yyyy-MM-dd">
                                            <div slot="afterDateInput" class="form-field__bar"></div>
                                        </Datepicker>
                                    </td>
                                    <td>
                                        <div class="mdb-form-field form-group-limit">
                                            <div class="form-field__control form-field--is-filled">
                                                <input type="time" name="timein" v-model="starttime" v-validate="'is_time|required'" class="form-field__input inline-input" >
                                                <div class="form-field__bar"></div>
                                            </div>
                                            <span class="errors">{{ errors.first('timein') }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="mdb-form-field form-group-limit">
                                            <div class="form-field__control form-field--is-filled">
                                                <input type="time" name="timeout" v-model="endtime" v-validate="'is_time|required'" class="form-field__input inline-input" >
                                                <div class="form-field__bar"></div>
                                            </div>
                                            <span class="errors">{{ errors.first('timeout') }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="mdb-form-field form-group-limit">
                                            <div class="form-field__control form-field--is-filled">
                                                <input type="text" name="reason" v-model="reason" v-validate="'required'" class="form-field__input inline-input" >
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
                                    <td>
                                        sdf
                                    </td>
                                    <td>sdf</td>
                                    <td>sdf</td>
                                    <td>s</td>
                                    <td>s</td>
                                    <td>s</td>
                                    <td>s</td>
                                    <td>s</td>
                                </tr>
                                    
                            </tbody>
                    </table>
                </form>
            </div>
        </div>
    
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>Company</em></h5>
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
        <div class="clearfix"></div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>Requested By</em></h5>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" name="datefiled">
                        <label class="form-field__label">Date filed</label>
                        <div class="form-field__bar"></div>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" v-validate="'required'" name="idno">
                        <label class="form-field__label">ID no</label>
                        <div class="form-field__bar"></div>
                        <span class="errors">{{ errors.first('idno') }}</span>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" v-validate="'required'" name="name">
                        <label class="form-field__label">Name</label>
                        <div class="form-field__bar"></div>
                        <span class="errors">{{ errors.first('name') }}</span>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" v-validate="'required'" name="descripancy-date">
                        <label class="form-field__label">Descripancy date</label>
                        <div class="form-field__bar"></div>
                        <span class="errors">{{ errors.first('descripancy-date') }}</span>
                    </div>
                </div>
        </div>
    
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" v-validate="'required'" name="position">
                        <label class="form-field__label">Position</label>
                        <div class="form-field__bar"></div>
                        <span class="errors">{{ errors.first('position') }}</span>
                    </div>
                </div>
        </div>
        <div class="col-md-4">
                <div class="mdb-form-field form-group-limit">
                    <div class="form-field__control">
                        <input type="text" class="form-field__input" v-validate="'required'" name="branch">
                        <label class="form-field__label">Branch</label>
                        <div class="form-field__bar"></div>
                        <span class="errors">{{ errors.first('branch') }}</span>
                    </div>
                </div>
        </div>
        <div class="clearfix"></div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
        </div>
    </div>`
    });