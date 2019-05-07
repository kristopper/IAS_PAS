Vue.component('data-table', {
template: `
<div>
	<form method="post" @submit.prevent="" >
		<div class="modal-body">
			<table id="vdatatable"  class="mdl-data-table">
				<!---<tr>
				<td>asdfasf</td>
				</tr>--->
			</table>
		</div>

		<!-- Modal -->
		<div v-show="showModal">
		  <div class="modal fade" id="myModal2" role="dialog" data-backdrop="false" ref="modal2">
		    <div class="modal-dialog">
		    
		      <!-- Modal content-->
		      <div class="modal-content" >
		        <div class="modal-header">
		          <button type="button" class="close modal2-close" @click="showModal=false">&times;</button>
		          <h4 class="modal-title">Modal Header</h4>
		        </div>
		        <div class="modal-body">
		        <Datepicker v-model="form.date"></Datepicker>
		          {{selecteRow}}
		          <input type="text" v-validate="'required|numeric'" v-model="name" name="insta" required>
				 			<span class="errors">{{ errors.first('insta') }}</span>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default modal2-close" @click="showModal=false">Close</button>
		        </div>
		      </div>
		      
		    </div>
		  </div>
		  </div>

	</form>
</div>`,
data() {
	return {
    	headers:  [],
        rows: [],
        dtHandle: null,
        selecteRow:'',
        name:'',
        form:{
        	date: new Date(),
        },
        showModal: false
    }
},
methods:{
	getSelectedRow(data){
		this.selecteRow=data;
		this.showModal=true;
	},

	getSubmittedLeave(){
		axios.get('getleaveform/2')//+this.$root.$data.userid)
		.then((response)=>{
			let datainitialize = new Promise((resolve, reject)=>{
				this.rows = response.data;
				if(this.rows.length > 0)
				{
					Object.keys(response.data[0]).forEach((keys)=>{
						
						let key = keys;
						this.headers.push({title: key, data: key, className: 'details-control',});
						
					});
					resolve(true);
				}
				
			});

			datainitialize.then(()=>{
				let vm = this;
				$.fn.DataTable.ext.pager.numbers_length = 5;
			    let table = $('#vdatatable').DataTable({
			    	columns: vm.headers,
			        data: vm.rows,
			    	"sPaginationType": "simple_numbers",
			    	"dom": '<"top"f>rt<"mdl-grid"<"mdl-cell mdl-cell--4-col"i><"mdl-cell mdl-cell--8-col"p>><"clear">',
			        "scrollX": true,                     
			    });
			    // bootstrap modal
			    $('#myModal').on('shown.bs.modal', function (e) {
			        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
			    });

			    // row-details 
			     $('#vdatatable tbody').on('click', 'td.details-control', function () {
			        var tr = $(this).closest('tr');
			        var row = table.row(tr);

			        vm.getSelectedRow(row.data());
			      
			 
			   		 } );
	

			});


		});
	},
},
created(){
	this.getSubmittedLeave();
},
mounted() {
	
	// make multiple modal display in front
	$(document).on('show.bs.modal', '.modal', function (event) {
	 	var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function() {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);

	});
 
	// avoid closing alll modal
	/*$('.modal2-close').click(()=>{
		this.$root.$data.modaldepth = 1;
		$('#myModal2').modal('toggle');
		$('#myModal2').addClass('in-active');
		
	});*/

$('#myModal2').modal('toggle');

	$('#myModal2').on('show.bs.modal', function () {		
   		$('#myModal2').removeClass('in-active');
	});
	

	// fixed body padding when 2nd modal forgeo to close
	$('#myModal').on("hidden.bs.modal", ()=>{
		// $('#myModal2').modal('hide');
		this.showModal = false;
		$('body').css({'padding':'0px'});
	});
}  
});




// Vue.component('data-table', {
// template: `
// <div>
// 	<form method="post" @submit.prevent="addEmp" >
// 		<div class="modal-body">
// 			<table id="vdatatable"  class="mdl-data-table" style="width:100%"></table>
// 		</div>
// 	</form>
// </div>`,
// data() {
// 	return {
//     	headerss: [],
//         rows: [],
//         dtHandle: null,
//     }
// },
// methods:{
// 	getSubmittedForms(){
// 		axios.get('getleaveform/'+this.userid)
// 		.then((response)=>{
// 			this.rows = response.data;
// 			Object.keys(response.data[0]).forEach((keys)=>{
// 			this.headers.push({title: keys, data: keys});
// 		});
// 	}
// },
// created(){
// 	this.getSubmittedForms();

// 	// this.rows = this.data_rows;
// 	// Object.keys(this.data_rows[0]).forEach((keys)=>{
// 	// 	this.headers.push({title: keys, data: keys});
// 	// });	
// },
// mounted() {
// 	/*let vm = this;
//     vm.dtHandle = $('#vdatatable').DataTable({
//     	columns: vm.headers,
//         data: vm.data_rows,
//     	"sPaginationType": "simple_numbers",
//     	"dom": '<"top"f>rt<"mdl-grid"<"mdl-cell mdl-cell--4-col"i><"mdl-cell mdl-cell--8-col"p>><"clear">',
//         "scrollX": true,                     
//     });
//     $('#myModal').on('shown.bs.modal', function (e) {
//         $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
//     });*/
// }  
// });








// Vue.component('data-table', {
// template: `
// <div>
// 	<form method="post" @submit.prevent="addEmp" >
// 		<div class="modal-body">
// 			<table id="vdatatable"  class="mdl-data-table"></table>
// 		</div>
// 	</form>
// </div>`,
// data() {
// 	return {
//     	headers:  [
//         	{ title: 'Name', data: 'name'},
//             { title: 'Position', data: 'position' },
//             { title:'Slaray', data: 'salary' },
//             { title: 'Office', data: 'office' }
//         ],
//         rows: [
//         	{
//              name:       "Tiger Nixon",
//              position:   "System Architect",
//              salary:     "$3,120",
//              start_date: "2011/04/25",
//              office:     "Edinburgh",
//              extn:       "5421"
//             },
//             {
//             name:       "Garrett Winters",
//             position:   "Director",
//             salary:     "$5,300",
//             start_date: "2011/07/25",
//             office:     "Edinburgh",
//             extn:       "8422"
//             },
            
//          ],
//          dtHandle: null
//     }
// },
// mounted() {
// 	let vm = this;
//      // Instantiate the datatable and store the reference to the instance in our dtHandle element.
//     vm.dtHandle = $('#vdatatable').DataTable({
//     // Specify whatever options you want, at a minimum these:
//     	"dom": '<"top"f>rt<"bottom"p><"clear">',
//         columns: vm.headers,
//         data: vm.rows,
//         "bAutoWidth": false,
//         columnDefs: [
// 	    	{
// 	        	/* targets: -1,
//         		className: 'dt-body-right'*/
// 	    	}
// 	  	],

//     });
// }  
// });