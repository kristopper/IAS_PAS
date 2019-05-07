Vue.component('clx-form', {
data(){
    return{
        datestart: moment(new Date()).format('YYYY-MM-DD'),
        stime: '01:05 AM',
        isDisable: false,
        
    }
},
computed:{
    isFormValid(){
        return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
},
created() {
    VeeValidate.Validator.extend('is_time', {
        getMessage: field => `The format must be HH:MM AM/PM`,
        validate: (value) => new Promise(resolve => {
            // let regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])");
            // let regex = new RegExp("^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$");
            let regex = new RegExp("^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9])|(24:?00))");
            resolve({
                valid: value && regex.test(value)
            });
        })
    });
},
template: `
<div>
    <form action="" @submit.prevent="submit">
    <h3 class="text-center form-title"><span class="dblUnderlined">CLEARANCE FORM</span></h3>
        <div class="col-md-4">
        <div class="mdb-form-field form-group-limit">
            <div class="form-field__control">
                <input type="text" class="form-field__input" name="Date filed">
                <label class="form-field__label">Date filed</label>
                <div class="form-field__bar"></div>
            </div>
        </div>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Position">
                    <label class="form-field__label">Position</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Department">
                    <label class="form-field__label">Department</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Branch">
                    <label class="form-field__label">Branch</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Last Day">
                    <label class="form-field__label">Last Day</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>IMMEDIATE SUPERRIOR/HEAD</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>CRO (optional)</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>WAREHOUSE DEPT</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>RMS (optional)</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>AREA MANAGER</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>CREDIT & COLLECTION</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>FINANCE/ACCOUNTING DEPT</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>AUDIT DEPT</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>IT DEPT</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>HR DEPT</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>EVP & CHIEF OPERATIONS OFFICER</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <h5 class="form-subtitle"><em>EVP & CHIEF FINANCE OFFICER</em></h5>
        </div>
        <div class="col-md-8">
            <div class="mdb-form-field">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Name">
                    <label class="form-field__label">Name</label>
                    <div class="form-field__bar"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="mdb-form-field form-group-limit">
                <div class="form-field__control">
                    <input type="text" class="form-field__input" name="Status">
                    <label class="form-field__label">Status</label>
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
