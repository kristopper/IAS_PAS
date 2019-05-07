// BRANCH ENTRY
Vue.component('overtime-form', {
props: ['userinfo'],
data: function () {
	return {

			isDisable: false,
			datefiled: moment(new Date()).format('YYYY-MM-DD hh-mm-ss'),
			nclusiveDate: moment(new Date()).format('YYYY-MM-DD'),
			employee:[],
			employeelist:[],
			search: '',
			deptID: '',
			starttime: moment(new Date()).format('hh:mm'),
			endtime: moment(new Date()).add(30, 'minutes').format('hh:mm'),

		}
},
methods:{
	addOverTime(){
	 if(this.isFormValid){
		this.isDisable = true;
		let self = this;
		let params = {employeelist: this.employeelist};
		axios.post('addovertime', params).then(function (response) {
			self.closeModal();
			
		});
	 }
	 
	},
	//getters
	getEmpDept(){
		
		axios.get('get-emp-department')
		.then((response)=>{
			this.employee =  response.data;
		})
		.catch();
	},

	appendEmpList(val, empIDselected){
		this.search = val.fname;
		let index = this.employee.map(function(emp) {return emp.empID_; }).indexOf(empIDselected);
		this.employee.splice(index, 1);
	
		val['nclusiveDate'] = moment(this.nclusiveDate).format('YYYY-MM-DD');
		val['starttime'] = this.starttime;
		val['endtime'] = this.endtime;
		val['totalhrs'] = this.getDiffTime;
		val['datecreated'] = this.datefiled;
		val['reqby'] = this.userinfo.empID;
		this.employeelist.unshift(val);
		
	},

	closeModal(){ 		
		let obj = this.$data;
		Object.keys(obj).forEach((key)=>{
		
			if(key != 'datefiled' && key != 'employee' && 
			   key != 'starttime' && key != 'endtime' &&
			   key != 'nclusiveDate' && key != 'employeelist'){
				this.$data[key] =  '';
			}
			if(key == 'employeelist')
			{
				this.employee = this.employee.concat(this.employeelist);
				this.$data[key]=[];
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
	serchEmp(){
		let self = this;
		let counter = 1;
		return this.employee.filter(function(emp){
			return emp.fname.toLowerCase().indexOf(self.search.toLowerCase()) == 0 /*|| 
				   emp.fname.toLowerCase().indexOf(self.search.toLowerCase()) == 0 */&& counter++ <=3;
		});
	},

	getDiffTime(){
		let startTime = moment(this.starttime, "HH:mm:ss");
		let endTime = moment(this.endtime, "HH:mm:ss");
		let totalhrs = endTime.diff(startTime, 'hours')+':'+(endTime.diff(startTime, 'minutes')%60);
		// let totalhrs = moment.duration(endTime.diff(startTime)).as('minutes');
		return totalhrs;
	}


},

created(){
	
	this.getEmpDept();
	
},
mounted(){
	$('#myModal').on("hidden.bs.modal", this.closeModal);
	
	$(this.$refs.clockpicker).clockpicker({ placement: 'bottom', donetext: 'Done', autoclose:false, vibrate: true, })
	.change((e) => {
    	// console.log(e);
        // console.log(e.currentTarget.value);
        this.starttime = e.currentTarget.value;
    });

    $(this.$refs.clockpicker2).clockpicker({ placement: 'bottom', donetext: 'Done', autoclose:false, vibrate: true, })
	.change((e) => {
    	// console.log(e);
        // console.log(e.currentTarget.value);
        this.endtime = e.currentTarget.value;
    });
},
template: `
<div>
	<form method="post" @submit.prevent="addOverTime">
	<h3 class="text-center form-title"><span class="dblUnderlined">REQUEST FOR OVERTIME</span></h3>
		<div class="group form-group-limit">
				<Datepicker v-model="nclusiveDate" :typeable="false" format="yyyy-MM-dd">
				<span slot="afterDateInput" class="highlight"></span>
				<span slot="afterDateInput" class="bar"></span>
				<label class="mdb" slot="afterDateInput">Inclusive Date</label>
				<span slot="afterDateInput" class="errors">{{ errors.first('mname') }}</span>
				</Datepicker>
		</div>
		<div class="d-flex space-between">
			<div class="group form-group-limit">
				<input type="text" id="clockpicker" v-model="starttime" readonly="readonly" ref="clockpicker">
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">time start</label>
			</div>
			<div class="group form-group-limit">
				<input type="text" id="clockpicker2" v-model="endtime" readonly="readonly" ref="clockpicker2">
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">time start</label>
			</div>

			<div class="group form-group-limit">      
				<input type="text" v-model="search" name="empid">
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Search</label>
				<div class="searchres" v-show="search">
					<ul>
						<li v-for="emp in serchEmp"><a @click="appendEmpList(emp, emp.empID_)">{{emp.lname}}</a></li>
						<!---<li><a>sss</a></li>
						<li><a>sss</a></li>--->
					</ul>
				</div>
			</div>
		</div>
		<div style="min-height:100px; max-height:200px; height:100%; overflow: scroll;">
		<table class="custom-table" width="100%">
			<thead>
				<tr>
					<th class="details-control">Name Of Employess</th>
					<th class="details-control">Designation</th>
					<th class="details-control">Inclusive Dates</th>
					<th class="details-control">from</th>
					<th class="details-control">to</th>
					<th class="details-control">total(hrs)</th>
				</tr>
			</thead>
			<tbody style="over-flow: scroll;">
				<tr v-for="(emp, index) in employeelist">
					<td>{{emp.fname}}</td>
					<td>{{emp.fname}}</td>
					<td>
						{{emp.nclusiveDate}}
					</td>
					<td>{{emp.starttime}}</td>
					<td>{{emp.endtime}}</td>
					<td>{{emp.totalhrs}}</td>
				</tr>
			</tbody>
		</table>
		</div>
		<div class="col-md-12">
			<h5 class="form-subtitle"></h5>
		</div>
		<div class="clearfix"></div>
		<div class="d-flex space-between">
			<div class="group form-group-limit">      
				<input type="text" :value="userinfo.fname +', '+ userinfo.lname" name="empid"  readonly="readonly" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Requested By</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
			<div class="group form-group-limit">      
				<input type="text" :value="userinfo.deptname" name="empid"  readonly="readonly" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Department</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>

			
		</div>
		<div class="clearfix"></div>
		<div class="modal-footer">
			<input type="submit" class="btn btn-primary" value="Submit" >
		</div>




		<!---
	   	<div class="col-lg-6">
		<div class="group form-group-limit">      
			<input type="text" v-validate="'required'" name="empid" required>
			<span class="highlight"></span>
			<span class="bar"></span>
			<label class="mdb">Requested by</label>
			<span class="errors">{{ errors.first('empid') }}</span>
		</div>
		</div>
		<div class="col-lg-6">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Date Filled</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-6">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Department</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-6">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Designation</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-4">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">From</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-4">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">To</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-3">
			<div class="group form-group-limit">      
				<input type="text" v-validate="'required'" name="empid" required>
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="mdb">Total hrs</label>
				<span class="errors">{{ errors.first('empid') }}</span>
			</div>
		</div>
		<div class="col-lg-12">
			<h5 class="form-subtitle"></h5>
			<div class="group">
				<em>Reasons to overtime</em>
				<textarea name="" id="" cols="4" rows="4" placeholder="Please specify here..."></textarea>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="modal-footer">
			<input type="submit" class="btn btn-primary" value="Submit" :disabled="isDisable || !isFormValid">
		</div>
		--->
	</form>
</div>`
});